import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, Unique, OneToMany } from "typeorm";
import * as bcrypt from 'bcrypt';
import { TaskEntity } from "src/tasks/task.entity";

@Entity()
@Unique(['username'])
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    username:string;
    @Column()
    password:string;
    @Column()
    salt:string;

    @OneToMany(type => TaskEntity,task=>task.user , {eager :true} )
    tasks:TaskEntity[];

    async ValidatePassword(password:string):Promise<boolean>{
        const haspass = await bcrypt.hash(password,this.salt);

        return haspass== this.password ;
    }
}