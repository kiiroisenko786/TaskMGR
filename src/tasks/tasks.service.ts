/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './tasks-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksfilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
constructor (private readonly tasksRepository: TaskRepository) {}
//     getAllTasks(): Task[] {
//         return this.tasks;
//     }

//     getTasksWithFilters(filterDto: GetTasksfilterDto): Task[] {
//         const {status, search} = filterDto;

//         let tasks = this.getAllTasks();

//         if (status) {
//             tasks = tasks.filter((task) => task.status === status);
//         }

//         if (search) {
//             tasks = tasks.filter((task) => {
//                 if (task.title.includes(search) || task.description.includes(search)) {
//                     return true;
//                 }
//                 return false;
//             });
//         }
        
//         return tasks;
//     }

    async getTaskById(id: string): Promise<Task> {
        const found = await this.tasksRepository.findOne({
            where: {
                id: id,
            }
        });

        if (!found) {
            throw new NotFoundException();
        }

        return found;
    }

    // Not async because we don't use await
    createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        return this.tasksRepository.createTask(createTaskDto);
    }

//     createTask(CreateTaskDto): Task {
//         const {title, description} = CreateTaskDto;

//         const task: Task = {
//             id: uuid(),
//             title,
//             description,
//             status: TaskStatus.OPEN,
//         };

//         this.tasks.push(task);

//         return task;
//     }

//     deleteTask(id: string): void {
//         const found = this.getTaskById(id);
//         this.tasks = this.tasks.filter((task) => task.id !== found.id);
//     }

//     updateTaskStatus(id: string, status: TaskStatus) {
//         const task = this.getTaskById(id);
//         task.status = status;
//         return task;
//     }
}
