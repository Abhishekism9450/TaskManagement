import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { typeOrmConfig } from 'src/config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import {JwtModule, JwtService} from '@nestjs/jwt';
import {PassportModule, PassportStrategy } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports:[
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.register({
      secret: 'topSecret51',
      signOptions: {
       expiresIn : 3600,  
      }
    }),
    TypeOrmModule.forFeature([UserRepository]),
  ],
  controllers: [AuthController],
  providers: [
    JwtStrategy,
    AuthService
  ],
  exports:[
    JwtStrategy,
    PassportModule,
  ]
})
export class AuthModule {}
