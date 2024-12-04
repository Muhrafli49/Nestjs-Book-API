import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from 'src/config/jwt.config';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshToken } from './entity/refresh-token.entity'; 
import { RefreshTokenRepository } from './repository/refresh-token.repository'; 
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    JwtModule.register(jwtConfig),
    TypeOrmModule.forFeature([RefreshToken]), 
    UsersModule,
  ],
  providers: [AuthService, RefreshTokenRepository, JwtStrategy], 
  controllers: [AuthController],
})
export class AuthModule {}
