import { BaseEntity, PrimaryGeneratedColumn, Column, Entity } from "typeorm";
import { TaskStatus } from "./task-status.enum";

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
}