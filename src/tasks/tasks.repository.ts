import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
// import { CreateTaskDto } from './create-task.dto';
//import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
 
@Injectable()
export class TaskRepository extends Repository<Task> {
  constructor(private dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }
}