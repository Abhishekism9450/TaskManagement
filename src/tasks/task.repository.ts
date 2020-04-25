import { Repository, EntityRepository, QueryBuilder } from "typeorm";
import { TaskEntity } from "./task.entity";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskStatus } from "./task-status.enum";
import { filterTaskDto } from "./dto/get-task-filter.dto";

@EntityRepository(TaskEntity)
export class TaskRepository extends Repository<TaskEntity>{

    async FilterTask(filterdto:filterTaskDto):Promise<TaskEntity[]>{
        const {status , search} = filterdto;

        const query = this.createQueryBuilder('task');

        if(status)
        {
            query.andWhere('task.status = :status', {status});
        }
        if(search)
        {
            query.andWhere('(task.title LIKE :search OR task.description LIKE :search)' , {search: `%${search}%`})
        }
        const tasks = query.getMany();

        return tasks;
    }

    async CreateTask(createtaskdto:CreateTaskDto):Promise<TaskEntity>{
        const {title, description} = createtaskdto;

        const task = new TaskEntity();
        task.title= title,
        task.description= description,
        task.status = TaskStatus.OPEN,

        await task.save();

        return task;
    }
}