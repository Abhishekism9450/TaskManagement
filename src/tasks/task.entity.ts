import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, ManyToOne } from "typeorm";
import { TaskStatus } from "./task-status.enum";
import { User } from "src/auth/user.entity";

@Entity('task')
export class TaskEntity extends BaseEntity{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    title:string;

    @Column()
    description:string;

    @Column()
    status:TaskStatus

    @ManyToOne(type=>User , user=>user.tasks , {eager:false})
    user : User;

    @Column()
    userId:number;
}