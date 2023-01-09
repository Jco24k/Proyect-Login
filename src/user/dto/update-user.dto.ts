import { PartialType } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';
import { Types } from 'mongoose';
import { IsMongoIdValid } from '../../common/validator/mongoId_or_empy.validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(
    CreateUserDto) {
        @IsOptional()
        @IsMongoIdValid('_id', { message: '_id must be a mongodb id' })
        _id: Types.ObjectId;
    
        @IsOptional()
        @IsNumber()
        __v: number;
}
