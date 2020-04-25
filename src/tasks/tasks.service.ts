import { Injectable, NotFoundException } from '@nestjs/common';
import * as uuid from 'uuid/v1';
import { CreateTaskDto } from './dto/create-task.dto';
import { filterTaskDto } from './dto/get-task-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskrepository: TaskRepository,
  ) {}

  // GetAlltasks():Task[]
  // {
  //     return this.task;
  // }

  async GetTaskById(id: number): Promise<TaskEntity>{
    const found = await this.taskrepository.findOne(id);

    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  // GetTaskById(id:string){
  //     let found = this.task.find(task=> task.id==id);
  //     if(!found){
  //         throw new NotFoundException();
  //     }
  //     else{
  //         return this.task.find(task=> task.id==id);
  //     }
  // }

  async DeleteTaskById(id:number):Promise<void>
  {
      const result= await this.taskrepository.delete(id);
      if(result.affected === 0)
      {
        throw new NotFoundException();
      }

  }
  // DeleteById(id:string){
  //     var res = this.task.findIndex(task=> task.id==id);
  //     return this.task.splice(res);
  // }
  CreateTask(createtaskdto:CreateTaskDto):Promise<TaskEntity>{

    return this.taskrepository.CreateTask(createtaskdto);
  }

  // UpdateTaskById(id:string,status:string)
  // {
  //     let res = this.task.findIndex(task=>task.id==id);
  //     this.task[res].status = TaskStatus[status];
  //     return this.task;
  // }

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
