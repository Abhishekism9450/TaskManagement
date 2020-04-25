import { TaskStatus } from "../task-status.enum";

export class filterTaskDto
{
    status: TaskStatus;
    search : string;
}