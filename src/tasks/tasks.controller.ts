import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {

    constructor(private tasksService:TasksService){}

    @Get()
    GetAllTask():Task[]
    {
        return this.tasksService.GetAlltasks();
    }

    @Get('/:id')
    GetTaskById(@Param('id') id:string)
    {
        return this.tasksService.GetTaskById(id);
    }
    @Delete('/:id')
    DeleteById(@Param('id') id:string){
        return this.tasksService.DeleteById(id);
    }
    @Post()
    CreateTask(@Body() createtaskdto:CreateTaskDto):Task{
        return this.tasksService.CreateTask(createtaskdto);
    }
    @Patch('/:id/:status')
    Updatetask(@Param('id') id:string, @Param('status') status:string)
    {

        return this.tasksService.UpdateTaskById(id,status);
    }
}
