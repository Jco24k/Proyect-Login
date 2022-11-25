import { Schema, SchemaFactory } from "@nestjs/mongoose";
import { Prop } from "@nestjs/mongoose/dist";
import { ApiProperty, ApiTags } from "@nestjs/swagger";
import { Document } from "mongoose";

@Schema()
export class Employee  extends Document{

    @ApiProperty({
        example: 'jesus coronado',
        description: 'Employee "names"'
    })
    @Prop({index: true,
        set: (val: string) => val.toLowerCase(), get: (val: string) => val 
    })
    names:string;

    @ApiProperty({
        example: '999666111',
        description: 'Employee "phones"',
        uniqueItems: true,
        minLength: 9,
        maxLength: 9
    })
    @Prop({index: true, unique:true})
    phone: string;

    @ApiProperty({
        example: '45612378',
        description: 'Employee "dni"',
        uniqueItems: true,
        minLength: 8,
        maxLength: 8
    })
    @Prop({unique:true,index: true,})
    dni: string;

    @ApiProperty({
        example: true,
        description: 'Employee "status"',
        default: true
    })
    @Prop({index: true,default:true})
    status: boolean;
    
    

}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);