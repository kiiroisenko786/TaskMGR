/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './tasks-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksfilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { User } from '../auth/user.entity';

@Injectable()
export class TasksService {
constructor (private readonly tasksRepository: TaskRepository) {}

    getTasks(filterDto: GetTasksfilterDto, user: User): Promise<Task[]> {
        return this.tasksRepository.getTasks(filterDto, user);
    }

    async getTaskById(id: string, user: User): Promise<Task> {
        const found = await this.tasksRepository.findOne({
            where: {
                id: id,
                user: user,
            }
        });

        if (!found) {
            throw new NotFoundException();
        }

        return found;
    }

    // Not async because we don't use await
    createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
        return this.tasksRepository.createTask(createTaskDto, user);
    }

    async deleteTask(id: string, user: User): Promise<void> {
        const result = await this.tasksRepository.delete({ id, user });
        
        if (result.affected === 0) {
            throw new NotFoundException(`Task with ID ${id} not found`); // THIS USES BACKTICKS
        }
    }

    async updateTaskStatus(id: string, status: TaskStatus, user: User): Promise<Task>{
        const task = await this.getTaskById(id, user);
        
        task.status = status;

        await this.tasksRepository.save(task);

        return task;
    }
}
