import { Injectable } from '@nestjs/common';
import { BadRequestException, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common/exceptions';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model, PipelineStage, Types } from 'mongoose';
import { PaginationDto } from '../common/dto/pagination.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../auth/interfaces/jwt-payload.interface';
import { Role } from '../roles/entities/role.entity';
import { Employee } from '../employees/entities/employee.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EmployeesService } from '../employees/employees.service';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserService {

  private defaultLimit: number;

  constructor(
    @InjectModel(Employee.name)
    private readonly EmployeeModel: Model<Employee>,
    @InjectModel(User.name)
    private readonly UserModel: Model<User>,
    @InjectModel(Role.name)
    private readonly RoleModel: Model<Role>,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly employeeService: EmployeesService,
    private readonly authService: AuthService


  ) {
    this.defaultLimit = configService.get<number>('defaultlimit');
  }

  async create(createUserDto: CreateUserDto) {
    await this.findForeignKey(createUserDto);
    const { password, ...userData } = createUserDto
    try {
      const user = await this.UserModel.create({
        ...userData,
        password: bcrypt.hashSync(password, 10)
      });
      return {
        ...user.toJSON(),
        token: this.authService.getJwtToken({ id: user._id })
      };
    } catch (error) {
      this.handleException(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = this.defaultLimit, offset = 0 } = paginationDto; 

    const userList: User [] =  await this.UserModel.find()
      .populate('roles')
      .limit(limit)
      .skip(offset)
      .sort({ _id: 1 });

    return userList.map(({roles,...detailsUser})=>({
      ...detailsUser['_doc'],
      roles: roles.map( rol => rol.name )
    }))
  }

  async findOne(search: string) {
    var user: User;
    if (isValidObjectId(search)) {
      user = await this.UserModel.findById(new Types.ObjectId(search));
    } else {
      user = await this.UserModel.findOne({ username: search });
    }

    if (!user) throw new NotFoundException(`User with id or username '${search}' not found`);
    return user;
  }


  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    await this.findForeignKey(updateUserDto)
    try {
      if(updateUserDto.password)  updateUserDto.password =  bcrypt.hashSync(updateUserDto.password, 10)
      await user.updateOne(updateUserDto, { new: true }); 
      return await this.findOne(id);
    } catch (error) {
      this.handleException(error);
    }
  }

  async remove(id: string) {
    const user =  await this.findOne( id );
    await user.updateOne({status:false});
    return { ...user.toJSON(), status:false }; 
  }

  async findForeignKey(updateUserDto: CreateUserDto | UpdateUserDto) {
    if (updateUserDto.roles) {
      const roles = await this.RoleModel.find({ "_id": { $in: updateUserDto.roles } })
      if (roles.length !== updateUserDto.roles.length)
        throw new NotFoundException(`Roles not found`);
    }
    if (updateUserDto.id_employee) {
      const employee = await this.employeeService.findOne(updateUserDto.id_employee.toString());
    }
  }

  private handleException(error: any): never {
    if (error.code === 11000) {
      throw new BadRequestException(`User is exists in db ${JSON.stringify(error.keyValue)}`);
    }
    throw new InternalServerErrorException(`Can'n create User - Check Serve Logs`);
  }


}
