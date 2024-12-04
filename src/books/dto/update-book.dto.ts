import { IsInt, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateBookDto {
    @IsNotEmpty()  
    title: string;

    @IsNotEmpty()
    author: string;

    @IsNotEmpty()
    category: string;

    @IsNotEmpty()
    @IsInt()
    @Type(() => Number)
    year: number;
}
