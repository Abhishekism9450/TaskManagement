import { Repository, EntityRepository, QueryBuilder } from "typeorm";
import { TaskEntity } from "./task.entity";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskStatus } from "./task-status.enum";
import { filterTaskDto } from "./dto/get-task-filter.dto";
import { User } from "src/auth/user.entity";

@EntityRepository(TaskEntity)
export class TaskRepository extends Repository<TaskEntity>{

    async FilterTask(filterdto:filterTaskDto,user:User):Promise<TaskEntity[]>{
        const {status , search} = filterdto;

        const query = this.createQueryBuilder('task');
        query.where('task.userId = :userId', {userId :user.id })

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

    async CreateTask(createtaskdto:CreateTaskDto , user:User):Promise<TaskEntity>{
        const {title, description} = createtaskdto;

        const task = new TaskEntity();
        task.title= title,
        task.description= description,
        task.status = TaskStatus.OPEN,
        task.user = user,
        await task.save();

        delete(task.user) ; 
        return task;
    }
}