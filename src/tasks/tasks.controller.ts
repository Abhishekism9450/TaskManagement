import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { filterTaskDto } from './dto/get-task-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { TaskEntity } from './task.entity';
import { TaskStatus } from './task-status.enum';

@Controller('tasks')
export class TasksController {

    constructor(private tasksService:TasksService){}

    @Get()
    GetTask(@Query() filterdto:filterTaskDto):Promise<TaskEntity[]>{
        return this.tasksService.GetTasks(filterdto);
    }

    @Get('/:id')
    GetTaskById(@Param('id', ParseIntPipe) id:number) : Promise<TaskEntity>
    {
        return this.tasksService.GetTaskById(id);
    }
    @Delete('/:id')
    DeleteById(@Param('id', ParseIntPipe) id:number):Promise<void>{
        return this.tasksService.DeleteTaskById(id);
    }
    @Post()
    @UsePipes(ValidationPipe)
    CreateTask(@Body() createtaskdto:CreateTaskDto):Promise<TaskEntity>{
        return this.tasksService.CreateTask(createtaskdto);
    }
    @Patch('/:id/:status')
    Updatetask(@Param('id', ParseIntPipe) id:number, @Param('status', TaskStatusValidationPipe) status:TaskStatus):Promise<TaskEntity>
    {
        return this.tasksService.UpdateTaskById(id,status);
    }
}
