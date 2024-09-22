import { Test } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TaskRepository } from './tasks.repository';
import { TaskStatus } from './tasks-status.enum';
import { NotFoundException } from '@nestjs/common';

const mockTaskRepository = () => ({
    getTasks: jest.fn(),
    findOne: jest.fn(),
});

const mockUser = {
    username: 'beans',
    id: 'someId',
    password: 'password',
    tasks: [],
};

describe('TasksService', () => {
    let taskService: TasksService;
    let tasksRepository;

    beforeEach(async () => {
        // Initialize NestJS module with tasksService & tasksRepository
        const module = await Test.createTestingModule({
            providers: [TasksService,
                { provide: TaskRepository, useFactory: mockTaskRepository },
            ],
        }).compile();

        taskService = module.get(TasksService);
        tasksRepository = module.get(TaskRepository);
    });

    describe('getTasks', () => {
        it('calls TasksRepository.getTasks and returns the result', async () => {
            tasksRepository.getTasks.mockResolvedValue('someValue');
            const result = await taskService.getTasks(null, mockUser);
            expect(result).toEqual('someValue');
        });
    });

    describe('getTaskById', () => {
        it('calls TasksRepository.findOne and returns the result', async () => {
            const mockTask = {
                title: "Test title",
                description: "test description",
                id: "someId",
                status: TaskStatus.OPEN,
            };
            tasksRepository.findOne.mockResolvedValue(mockTask);
            const result = await taskService.getTaskById('someId', mockUser);
            expect(result).toEqual(mockTask);
        });

        it('calls TasksRepository.findOne and handles an error', async () => {
            tasksRepository.findOne.mockResolvedValue(null);
            expect(taskService.getTaskById('someId', mockUser)).rejects.toThrow(NotFoundException);
        });
    });
});