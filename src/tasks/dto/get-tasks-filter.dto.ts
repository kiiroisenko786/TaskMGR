import { TaskStatus } from "../tasks.model";

export class GetTasksfilterDto {
    status?: TaskStatus;
    search?: string;
}