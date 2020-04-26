import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Injectable()
export class AuthService {
    constructor (
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
    ){}

    async signUp(authCredentialdto : AuthCredentialsDto):Promise<void>{
        return this.userRepository.signUp(authCredentialdto);
    }

    async signIn(authCredentialdto : AuthCredentialsDto):Promise<void>{
        const username = await this.userRepository.signIn(authCredentialdto);

        if(!username)
        {
            throw new UnauthorizedException("Invalid Credentials");
        }

    }

}
