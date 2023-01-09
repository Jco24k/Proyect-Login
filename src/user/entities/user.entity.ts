import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Document, Types } from "mongoose";
import { Employee } from "../../employees/entities/employee.entity";
import { Role } from "../../roles/entities/role.entity";

@Schema()
export class User extends Document {

    @ApiProperty({
        example: '637fbd82147dbb5978605da1',
        description: 'User "id_employee"',
        type: String,
        uniqueItems: true,
    })
    @Prop({ unique: true, index: true, type: Types.ObjectId, ref: Employee.name, required: true })
    id_employee: Types.ObjectId;

    @ApiProperty({
        example: 'UsEr_OnE01',
        description: 'User "username"',
        type: String,
        uniqueItems: true,
    })
    @Prop({ index: true, unique: true })
    username: string;

    @ApiProperty({
        example: '12345abcde',
        description: 'User "password"',
        type: String,
        uniqueItems: true,
    })
    @Prop({ index: true, select: false })
    password: string;

    @ApiProperty({
        example: ['637fbd82147dbb5978605d9a',
            '637fbd82147dbb5978605d9b', '637fbd82147dbb5978605d9c'],
        description: 'User "roles"',
        type: [String],
        uniqueItems: true,
    })
    @Prop({ type: [{ type: Types.ObjectId, ref: Role.name }] })
    roles: Types.Array<Role>;

    @ApiProperty({
        example: true,
        description: 'Employee "status"',
        default: true
    })
    @Prop({ index: true, default: true })
    status: boolean;

}

export const UserSchema = SchemaFactory.createForClass(User);