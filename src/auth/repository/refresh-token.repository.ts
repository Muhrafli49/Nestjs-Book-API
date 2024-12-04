import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { RefreshToken } from '../entity/refresh-token.entity';
import { User } from 'src/users/entity/user.entity';

@Injectable()
export class RefreshTokenRepository extends Repository<RefreshToken> {
    constructor(private readonly dataSource: DataSource) {
        super(RefreshToken, dataSource.createEntityManager());
    }

    async createRefreshToken(user: User, ttl: number): Promise<RefreshToken> {
        const refreshToken = this.create();
        refreshToken.user = user;
        refreshToken.isRevoked = false;

        const expiredAt = new Date();
        expiredAt.setTime(expiredAt.getTime() + ttl);
        refreshToken.expiredAt = expiredAt;

        return await this.save(refreshToken);
    }
}
