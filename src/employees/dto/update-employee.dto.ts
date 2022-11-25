import { PartialType } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';
import { Types } from 'mongoose';
import { IsMongoIdValid } from 'src/common/validator/mongoId_or_empy.validator';
import { CreateEmployeeDto } from './create-employee.dto';

export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) {
    @IsOptional()
    @IsMongoIdValid('_id', { message: '_id must be a mongodb id' })
    _id: Types.ObjectId;

    @IsOptional()
    @IsNumber()
    __v: number;
}
