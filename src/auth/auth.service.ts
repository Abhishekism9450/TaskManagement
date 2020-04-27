import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor (
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService:JwtService,
    ){}

    async signUp(authCredentialdto : AuthCredentialsDto):Promise<void>{
        return this.userRepository.signUp(authCredentialdto);
    }

    async signIn(authCredentialdto : AuthCredentialsDto):Promise<{accessToken: string}>{
        const username = await this.userRepository.signIn(authCredentialdto);

        if(!username)
        {
            throw new UnauthorizedException("Invalid Credentials");
        }

        const payload  : JwtPayload = {username} ;
        const accessToken = await this.jwtService.signAsync(payload);

        return {accessToken };

    }

}
