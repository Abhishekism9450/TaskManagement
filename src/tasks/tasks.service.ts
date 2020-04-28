import { Injectable, NotFoundException } from '@nestjs/common';
import * as uuid from 'uuid/v1';
import { CreateTaskDto } from './dto/create-task.dto';
import { filterTaskDto } from './dto/get-task-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskrepository: TaskRepository,
  ) {}

  async GetTasks(filterdto:filterTaskDto,user:User):Promise<TaskEntity[]>
  {
    return await this.taskrepository.FilterTask(filterdto,user);
  }

  async GetAllTasks()
  {
    return await this.taskrepository.find() ;
  }

  async GetTaskById(id: number): Promise<TaskEntity>{
    const found = await this.taskrepository.findOne(id);

    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  async DeleteTaskById(id:number):Promise<void>
  {
      const result= await this.taskrepository.delete(id);
      if(result.affected === 0)
      {
        throw new NotFoundException();
      }

  }
  CreateTask(createtaskdto:CreateTaskDto , user:User):Promise<TaskEntity>{

    return this.taskrepository.CreateTask(createtaskdto,user);
  }

 async UpdateTaskById(id:number , status : TaskStatus, title:string ): Promise<TaskEntity>
 {
    const task = await this.GetTaskById(id);
    task.status = status,
    task.title = title;
    await task.save();

    return task;
 }

  // FilterTask(filterdto: filterTaskDto)
  // {
  //     const {status ,search}  = filterdto;

  //     let task = this.GetAlltasks();

  //     if(status){
  //         task = task.filter(task => task.status == status);
  //     }
  //     if(search)
  //     {
  //         task = task.filter(
  //             task => task.description.includes(search) ||
  //             task.title.includes(search)
  //         );
  //     }
  //     return task;
  // }
}
