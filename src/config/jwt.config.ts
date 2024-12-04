import { JwtModuleOptions, JwtSignOptions } from '@nestjs/jwt';
import * as dotenv from 'dotenv';

dotenv.config();

export const jwtConfig: JwtModuleOptions = {
    secret: process.env.JWT_SECRET,
    signOptions: {
        expiresIn: parseInt(process.env.JWT_EXPIRES_IN || '60'),
    },
};

export const refreshTokenConfig: JwtSignOptions = {
    expiresIn: parseInt(process.env.REFRESH_TOKEN_EXPIRES_IN || '86400'), // Default 24 jam
};
