import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common'; 
import { isUUID } from 'class-validator';


@Injectable()
export class UUIDValidationPipe implements PipeTransform {
    transform(value: any) {
        if (!isUUID(value, 4) ) {
            throw new BadRequestException(`Value ${value} is not a valid UUID`);
        }
        return value;
    }
}