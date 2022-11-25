import { Optional } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { Types } from "mongoose";
import { IsMongoIdValid } from "src/common/validator/mongoId_or_empy.validator";
import { Role } from "src/roles/entities/role.entity";


export class CreateUserDto {
    
    @ApiProperty({
        description: 'User - "id_employee"',
        nullable: false,
        type: String,
        minLength: 1
    })
    @MinLength(1)
    @IsNotEmpty()
    @IsMongoIdValid('id_employee', { message: 'id_employee must be a mongodb id' })
    id_employee: Types.ObjectId;
    
    @ApiProperty({
        description: 'User - "username"',
        nullable: false,
        type: String,
        minLength: 6,
        maxLength: 50
    })
    @IsString()
    @MinLength(6)
    @MaxLength(50)
    username: string;



    @ApiProperty({
        description: 'User - "password"',
        nullable: false,
        type: String,
        minLength: 6,
        maxLength: 50,
    })
    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'The password must have a Uppercase, lowercase letter and a number'
    })
    password: string;

    
    @ApiProperty({
        description: 'User - "roles"',
        type: [String],
        nullable: false
    })
    @IsArray()
    @IsNotEmpty()
    @IsMongoIdValid('roles', { message: 'roles must be a mongodb id' }, true)
    roles: Types.Array<Role>


    @ApiProperty({
        description: 'User - "status"',
        type: Boolean,
        default:true
    })
    @IsBoolean()
    @IsOptional()
    status?: boolean;

}
