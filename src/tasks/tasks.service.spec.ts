import { Test } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TaskRepository } from './tasks.repository';

const mockTaskRepository = () => ({
    getTasks: jest.fn(),
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
        it('calls TasksRepository.findOne and returns the result', async => {

        });

        it('calls TasksRepository.findOne and handles an error', async => {

        });
    });
});