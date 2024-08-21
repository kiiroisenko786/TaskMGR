import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksfilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}

//     @Get()
//     getTasks(@Query() filterDto: GetTasksfilterDto): Task[] {
//         if(Object.keys(filterDto).length) {
//             return this.tasksService.getTasksWithFilters(filterDto);
//         } else {
//             return this.tasksService.getAllTasks();
//         }

//     }

    @Get('/:id')
    getTaskById(@Param('id') id: string): Promise<Task> {
        return this.tasksService.getTaskById(id);
    }

    @Post()
    createTask(@Body() CreateTaskDto: CreateTaskDto): Promise<Task> {
        return this.tasksService.createTask(CreateTaskDto);
    }

    @Delete('/:id')
    deleteTask(@Param('id') id: string): Promise<void> {
        return this.tasksService.deleteTask(id);
    }

//     @Patch('/:id/status')
//     updateTaskStatus(
//         @Param('id') id: string,
//         @Body() updateTaskStatusDto: UpdateTaskStatusDto,
//     ): Task {
//         const { status } = updateTaskStatusDto;
//         return this.tasksService.updateTaskStatus(id, status);
//     }
}