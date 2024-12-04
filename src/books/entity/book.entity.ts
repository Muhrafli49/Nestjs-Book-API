import { User } from "src/users/entity/user.entity";
import {
    Entity, 
    BaseEntity, 
    PrimaryGeneratedColumn, 
    Column, 
    ManyToMany 
} from "typeorm";

@Entity()
export class Book extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    author: string;

    @Column()
    category: string;

    @Column()
    year: number;

    @ManyToMany(() => User, (user) => user.books)
    user: User;

    // @Column({ nullable: true })
    // userId: number;

}

