import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeesService {
  
  private defaultLimit: number;

  constructor(
    @InjectModel(Employee.name)
    private readonly employeeModel: Model<Employee>,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService

  ) {
    this.defaultLimit = configService.get<number>('defaultlimit');
  }


  async create(createEmployeeDto: CreateEmployeeDto) {
     try {
      return await this.employeeModel.create(createEmployeeDto);
    } catch (error) {
      this.handleException(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = this.defaultLimit, offset = 0 } = paginationDto; 

    return await this.employeeModel.find()
      .limit(limit)
      .skip(offset)
      .sort({ _id: 1 });
  }

  async findOne(search: string) {
    let employee: Employee;
    if (isValidObjectId(search)) {
      employee = await this.employeeModel.findById(search);
    } else {
      employee = await this.employeeModel.findOne({ dni: search });
    }
    if (!employee) throw new NotFoundException(`Employee with id or dni ${search} not found`);
    return employee;
  }


  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    const employee = await this.findOne(id);
    try {
      await employee.updateOne(updateEmployeeDto, { new: true }); 
      return { ...employee.toJSON(), ...updateEmployeeDto }; 
    } catch (error) {
      this.handleException(error);
    }
  }

  async remove(id: string) {
    const employee = await this.findOne(id);
    await employee.updateOne({status:false});
    return { ...employee.toJSON(), status:false }; 
  }

  private handleException(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(`Employee is exists in db ${JSON.stringify(error.keyValue)}`);
    }
    throw new InternalServerErrorException(`Can'n create Employee - Check Serve Logs`);
  }

}
