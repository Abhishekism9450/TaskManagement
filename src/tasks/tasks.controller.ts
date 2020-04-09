import { Controller, Get, Post, Body } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';

@Controller('tasks')
export class TasksController {

    constructor(private tasksService:TasksService){}

    @Get()
    GetAllTask():Task[]
    {
        return this.tasksService.GetAlltasks();
    }

    @Post()
    CreateTask(
        @Body('title') title : string,
        @Body('description') description:string,
    ):Task{
        return this.tasksService.CreateTask(title,description);
    }
}
