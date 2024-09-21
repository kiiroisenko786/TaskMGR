import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './tasks-status.enum';
import { GetTasksfilterDto } from './dto/get-tasks-filter.dto';
import { User } from '../auth/user.entity';
import { Logger } from '@nestjs/common';
 
@Injectable()
export class TaskRepository extends Repository<Task> {
  private logger = new Logger('TaskRepository');
  constructor(private dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }

  async getTasks(filterDto: GetTasksfilterDto, user: User): Promise<Task[]> {
    const { status, search } = filterDto;

    const query = this.createQueryBuilder('task');
    query.where({ user });
    
    if (status) {
      query.andWhere('task.status = :status', { status: 'OPEN' });
    }

    if (search) {
      query.andWhere(
        '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
        { search: `%${search}%` },
      )
    }
    
    try {
      const tasks = await query.getMany();
      return tasks;
    } catch (error) {
      this.logger.error(`Failed to get task for user ${user.username}. Filters: ${JSON.stringify(filterDto)}`, error.stack);
      throw new InternalServerErrorException();
    }
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;

        const task = this.create({
            title,
            description,
            status: TaskStatus.OPEN,
            user,
        });

        await this.save(task);

        return task;
  }

}