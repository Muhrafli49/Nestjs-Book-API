import { Body, Controller, Get, Param, Post, Put, Delete, Query, UseGuards } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { FilterBookDto } from './dto/filter-book.dto';
import { Book } from './entity/book.entity';
import { UUIDValidationPipe } from 'src/pipes/uuid-validation.pipe';
import { User } from 'src/users/entity/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { JwtGuard } from 'src/guard/jwt.guard';

@Controller('books')
@UseGuards(JwtGuard)
export class BooksController {
    constructor(private booksService: BooksService) {}
    
    @Get()
    async getBooks(
        @Query() filter: FilterBookDto, 
        @GetUser() user: User
    ) : Promise<Book[]> {
        return this.booksService.getBooks(user, filter);
    }

    @Get('/:id')
    async getBookById(
        @GetUser() user: User, 
        @Param('id', UUIDValidationPipe) id: string)
            : Promise<Book> {
            return this.booksService.getBookById(user, id);
    }

    @Post()
    async createBook(
        @GetUser() user: User, 
        @Body() payload: CreateBookDto
    ) : Promise<void> {
        console.log(payload);
        return this.booksService.createBook(user, payload);
    }

    @Put('/:id')
    async updateBook(
        @GetUser() user: User, 
        @Param('id', UUIDValidationPipe) id: string,  
        @Body() payload: UpdateBookDto,
    ): Promise<void> {
        return this.booksService.updateBook(user, id, payload);
    }

    @Delete('/:id')
    async deleteBookById(
        @GetUser() user: User,
        @Param('id', UUIDValidationPipe) id: string)
        : Promise<void> {
            return this.booksService.deleteBookById(user, id);
    }
}
