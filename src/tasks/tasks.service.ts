import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import * as uuid from 'uuid/v1'
import { CreateTaskDto } from './dto/create-task.dto';
import { filterTaskDto } from './dto/get-task-filter.dto';

@Injectable()
export class TasksService {

    private task: Task[]= [];

    GetAlltasks():Task[]
    {
        return this.task;
    }

    GetTaskById(id:string){
        return this.task.find(task=> task.id==id);
    }

    DeleteById(id:string){
        var res = this.task.findIndex(task=> task.id==id);
        return this.task.splice(res);
    }
    CreateTask(createtaskdto:CreateTaskDto):Task{

        const {title, description}= createtaskdto;
       const task:Task={
        id:uuid(),
        title,
        description,
        status: TaskStatus.OPEN,
       }
       this.task.push(task);
       return task;
    }

    UpdateTaskById(id:string,status:string)
    {
        let res = this.task.findIndex(task=>task.id==id);
        this.task[res].status = TaskStatus[status];
        return this.task;
    }

    FilterTask(filterdto: filterTaskDto)
    {
        const {status ,search}  = filterdto;

        let task = this.GetAlltasks();

        if(status){
            task = task.filter(task => task.status == status);
        }
        if(search)
        {
            task = task.filter(
                task => task.description.includes(search) || 
                task.title.includes(search)
            );
        }
        return task;
    }

}
