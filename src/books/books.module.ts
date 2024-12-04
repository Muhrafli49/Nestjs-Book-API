import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BookRepository } from "./repository/book.repository";
import { Book } from "./entity/book.entity";
import { BooksService } from "./books.service";
import { BooksController } from "./books.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Book])],
    providers: [BooksService, BookRepository],
    controllers: [BooksController],
    exports: [BookRepository],
})
export class BooksModule {}
