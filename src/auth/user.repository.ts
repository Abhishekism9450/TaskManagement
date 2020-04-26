import { Repository, EntityRepository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User>{

    async signUp(authCredentialsDto: AuthCredentialsDto):Promise<void>{
        const {username , password} = authCredentialsDto;
        const user = new User();
        user.username = username;
        user.salt= await bcrypt.genSalt();
        user.password = await this.hashPassword(password,user.salt);
        try{
            await user.save();
        }
        catch(error){
            if(error.code=='ER_DUP_ENTRY')
            {
                throw new ConflictException("username exists");
            }else{
                console.log(error.code);
                throw new InternalServerErrorException();
            }
        }       
    }

    async signIn(authCredentialsDto: AuthCredentialsDto):Promise<string>{

        const {username , password }= authCredentialsDto;
        const user = await this.findOne({username});

        if(user && await user.ValidatePassword(password))
        {
            return user.username;
        }
        else{
            return null ;
        }
    }


    private async hashPassword(password,salt):Promise<string>{
        return bcrypt.hash(password,salt);
    } 
}