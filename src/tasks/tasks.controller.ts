import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { filterTaskDto } from './dto/get-task-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { TaskEntity } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {

    constructor(private tasksService:TasksService){}

    @Get()
    GetTask(@Query() filterdto:filterTaskDto,
            @GetUser() user:User
    ):Promise<TaskEntity[]>{
        return this.tasksService.GetTasks(filterdto,user);
    }

    @Get('/all')
    GetAllTask(){
        return this.tasksService.GetAllTasks();
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
    CreateTask(@Body() createtaskdto:CreateTaskDto,
                @GetUser() user:User,
    ):Promise<TaskEntity>{
        return this.tasksService.CreateTask(createtaskdto,user);
    }
    @Patch('/:id/:status')
    Updatetask(@Param('id', ParseIntPipe) id:number, @Param('status', TaskStatusValidationPipe) status:TaskStatus,
        @Body('title') title:string,
    ):Promise<TaskEntity>
    {
        return this.tasksService.UpdateTaskById(id,status,title);
    }
}
