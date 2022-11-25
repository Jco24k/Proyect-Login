import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Document } from "mongoose";

@Schema()
export class Role extends Document{
    @Prop({index: true,unique:true,
        set: (val: string) => val.toLowerCase(), get: (val: string) => val 
    })
    @ApiProperty({
        example: 'admin',
        description: 'Role "name"'
    })
    name: string;

    @ApiProperty({
        example: 'false',
        description: 'Role "status"'
    })
    @Prop({ default:true})
    status: boolean
    
}

export const RoleSchema = SchemaFactory.createForClass(Role);