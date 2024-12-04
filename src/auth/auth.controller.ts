import { Post, Body, Controller, UseGuards, Patch, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { LoginResponse } from './interface/login-response.interface';
import { RefreshAccessTokenDto } from './dto/refresh-access-token.dto';
import { JwtGuard } from 'src/guard/jwt.guard';
import { GetUser } from './get-user.decorator';
import { User } from 'src/users/entity/user.entity';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body() loginDto: LoginDto): Promise<LoginResponse> {
        return await this.authService.login(loginDto);
    }

    @Post('refresh-token')
    async refreshToken(@Body() refreshTokenDto: RefreshAccessTokenDto): Promise<{ access_token:string }> {
        return await this.authService.refreshAccessToken(refreshTokenDto);
    }

    @Patch('/:id/revoke')
    @UseGuards(JwtGuard)
    async revokeRefreshToken(@Param('id') id: string): Promise<void> {
        return await this.authService.revokeRefreshToken(id);
    }
}

