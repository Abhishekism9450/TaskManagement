import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, Unique } from "typeorm";
import * as bcrypt from 'bcrypt';

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

    async ValidatePassword(password:string):Promise<boolean>{
        const haspass = await bcrypt.hash(password,this.salt);

        return haspass== this.password ;
    }
}