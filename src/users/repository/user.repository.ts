import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entity/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepository extends Repository<User> {
    constructor(private dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
    }

    async createUser(createUserDto: CreateUserDto): Promise<void> {
        const { name, email, password } = createUserDto;

        const user = new User();
        user.name = name;
        user.email = email;
        user.salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(password, user.salt);

        try {
            await this.save(user); 
        } catch (e) {
            if(e.code == '23505') {
                throw new ConflictException(`Email ${email} already exists`); 
            } else {
                throw new InternalServerErrorException(e);
            }
        }
    }

    async validateUser(email: string, password: string): Promise<User> {
        const user = await this.findOne({ where: { email } });
        if (user && (await user.validatePassword(password))) {
            return user;
        } else {
            return null;
        }
    }
}
