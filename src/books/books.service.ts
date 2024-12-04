import { Injectable, NotFoundException } from '@nestjs/common';
// import { v4 as uuidv4 } from 'uuid';
// import { CreateBookDto } from './dto/create-book.dto';
// import { UpdateBookDto } from './dto/update-book.dto';
import { BookRepository } from './repository/book.repository';
import { FilterBookDto } from './dto/filter-book.dto';
import { Book } from './entity/book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { User } from 'src/users/entity/user.entity';

@Injectable()
export class BooksService {
    constructor(private readonly bookRepository: BookRepository) {}


    async getBooks(user: User, filter: FilterBookDto): Promise<Book[]> {
        return await this.bookRepository.getBooks(user, filter);
    }

    async createBook(createBookDto: CreateBookDto): Promise<void> {
        return await this.bookRepository.createBook(createBookDto);
    }

    async getBookById(id: string): Promise<Book>  {
        const book = await this.bookRepository.findOne({
            where: { id },
        });

        if (!book) {
            throw new NotFoundException(`Book with id ${id} not found`);
        }
            
        return book;
    }


    async updateBook(id: string, updateBookDto): Promise<void> {
        const { title, author, category, year } = updateBookDto;
        
        const book = await this.getBookById(id);
        book.title = title;
        book.author = author;
        book.category = category;
        book.year = year;

        await book.save();
    }

    async deleteBookById(id: string): Promise<void>{
        const result = await this.bookRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Book with id ${id} not found`);
        }
    }
}
