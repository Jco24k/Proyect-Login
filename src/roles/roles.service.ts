import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { User } from '../User/entities/User.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Role.name)
    private readonly roleModel: Model<Role>,
    @InjectModel(User.name)
    private readonly userModel: Model<User>
  ) {

  }
  async create(createRoleDto: CreateRoleDto) {
    try {
      return await this.roleModel.create(createRoleDto);
    } catch (error) {
      this.handleException(error);
    }
  }

  async findAll() {
    return await this.roleModel.find({});

  }

  async findOne(search: string) {
    let rol: Role;
    if (isValidObjectId(search)) {
      rol = await this.roleModel.findById(search);
    } else {
       rol = await this.roleModel.findOne({ name: search.toLowerCase().trim() });
    }

    if (!rol) throw new NotFoundException(`Role with id or name ${search} not found`);
    return rol;
  }

  async update(id: string, updateRoleDto: UpdateRoleDto) {
    const rol = await this.findOne(id);
    try {
      await rol.updateOne(updateRoleDto, { new: true });
      return { ...rol.toJSON(), ...updateRoleDto }; 
    } catch (error) {
      this.handleException(error);
    }
  }

  async remove(id: string) {
    const user = await this.userModel.findOne({id_role:id});
    if(user) throw new InternalServerErrorException(`The role with id ${user.roles} cannot be deleted because it is in use.`)
    const { deletedCount } = await this.roleModel.deleteOne({ _id: id });
    if (deletedCount === 0) throw new BadRequestException(`Role with id ${id} not found`);
    return { message: `Role with id ${id} deleted successfully` };
  }

  private handleException(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(`Role is exists in db ${JSON.stringify(error.keyValue)}`);
    }
    throw new InternalServerErrorException(`Can'n create Role - Check Serve Logs`);
  }
}
