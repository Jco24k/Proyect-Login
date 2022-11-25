import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsOptional, IsString, Matches, MinLength } from "class-validator";

export class CreateRoleDto {

    
    @ApiProperty({
        description: 'Role names',
        nullable: false,
        type: String,
        minLength: 1
    })
    @IsString()
    @MinLength(1)
    @IsNotEmpty()
    name: string;


    @ApiProperty({
        description: 'Role status',
        type: Boolean,
        default:true
    })
    @IsOptional()
    @IsBoolean()
    status: boolean;


}
