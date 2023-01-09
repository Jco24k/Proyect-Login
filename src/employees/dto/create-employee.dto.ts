import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength, IsNotEmpty, IsOptional, IsBoolean, IsEmail, IsNumber, Matches, IsArray, maxLength } from "class-validator";
import { IsDniValid } from "../../common/validator/isdnivalid.validator";
import { PhoneValid } from "../../common/validator/phone_valid.validator";

export class CreateEmployeeDto {

    @ApiProperty({
        description: 'Employee names',
        nullable: false,
        type: String,
        minLength: 1
    })
    @IsString()
    @MinLength(1)
    @IsNotEmpty()
    @Matches(/^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/, { message: 'names must contain only letters' })
    names: string;
    
    @ApiProperty({
        description: 'Employee phone',
        nullable: false,
        type: String,
        minLength: 9,
        maxLength:9
    })
    @IsString()
    @IsNotEmpty()
    @PhoneValid('phone', { message: 'phone must start with the number "9" and have 9 digits' })
    phone: string;


    @ApiProperty({
        description: 'Employee dni',
        nullable: false,
        type: String,
        minLength: 8,
        maxLength:8
    })
    @IsDniValid('dni', { message: 'dni must be to 8 digits' })
    dni: string;
    
    @ApiProperty({
        description: 'Employee status',
        type: Boolean,
        default:true
    })
    @IsBoolean()
    @IsNotEmpty()
    @IsOptional()
    status?: boolean;

}
