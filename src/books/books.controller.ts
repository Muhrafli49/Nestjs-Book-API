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
    async getBookById(@Param('id', UUIDValidationPipe) id: string): Promise<Book> {
        return this.booksService.getBookById(id);
    }

    @Post()
    async createBook(@Body() payload: CreateBookDto) : Promise<void> {
        console.log(payload);
        return this.booksService.createBook(payload);
    }

    @Put('/:id')
    async updateBook(
        @Param('id', UUIDValidationPipe) id: string,  
        @Body() payload: UpdateBookDto,
    ): Promise<void> {
        return this.booksService.updateBook(id, payload);
    }

    @Delete('/:id')
    async deleteBookById(@Param('id', UUIDValidationPipe) id: string): Promise<void> {
        return this.booksService.deleteBookById(id);
    }
}
