import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import * as uuid from 'uuid/v1'

@Injectable()
export class TasksService {

    private task: Task[]= [];

    GetAlltasks():Task[]
    {
        return this.task;
    }

    CreateTask(title:string, description:string):Task{
       const task:Task={
        id:uuid(),
        title,
        description,
        status: TaskStatus.OPEN,
       }
       this.task.push(task);
       return task;
    }

}
