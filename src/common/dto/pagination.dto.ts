import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsPositive, Min } from "class-validator";

export class PaginationDto {

    @ApiProperty({
        description: 'PaginationDto "limit"',
        type: Number,
        minimum: 1,
        default: 10
    })
    @IsOptional()
    @IsPositive()
    @IsNumber()
    @Min(1)
    @Type(() => Number)
    limit?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    @Type(() => Number)
    @ApiProperty({
        description: 'PaginationDto "offset"',
        type: Number,
        minimum: 0,
        default: 0
    })
    offset?: number;
}