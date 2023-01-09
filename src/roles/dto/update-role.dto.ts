import { PartialType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { Types } from 'mongoose';
import { IsMongoIdValid } from '../../common/validator/mongoId_or_empy.validator';
import { CreateRoleDto } from './create-role.dto';

export class UpdateRoleDto extends PartialType(CreateRoleDto) {
    @IsOptional()
    @IsMongoIdValid('_id', { message: '_id must be a mongodb id' })
    _id: Types.ObjectId;
}
