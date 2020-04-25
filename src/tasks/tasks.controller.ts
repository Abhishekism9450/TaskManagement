import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { filterTaskDto } from './dto/get-task-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';

@Controller('tasks')
export class TasksController {

    constructor(private tasksService:TasksService){}

    // @Get()
    // GetTask(@Query() filterdto: filterTaskDto):Task[]
    // {
    //     if(Object.keys(filterdto).length)
    //     {
    //         return this.tasksService.FilterTask(filterdto);
    //     }
    //     else{
    //         return this.tasksService.GetAlltasks();

    //     }
    // }

    // @Get('/:id')
    // GetTaskById(@Param('id') id:string)
    // {
    //     return this.tasksService.GetTaskById(id);
    // }
    // @Delete('/:id')
    // DeleteById(@Param('id') id:string){
    //     return this.tasksService.DeleteById(id);
    // }
    // @Post()
    // @UsePipes(ValidationPipe)
    // CreateTask(@Body() createtaskdto:CreateTaskDto):Task{
    //     return this.tasksService.CreateTask(createtaskdto);
    // }
    // @Patch('/:id/:status')
    // Updatetask(@Param('id') id:string, @Param('status', TaskStatusValidationPipe) status:string)
    // {
    //     return this.tasksService.UpdateTaskById(id,status);
    // }
}
