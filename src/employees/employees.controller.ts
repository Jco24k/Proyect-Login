import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe';
import { Auth, validRoles } from 'src/auth/interfaces';
import { ApiBearerAuth, ApiBody, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Employee } from './entities/employee.entity';

@Controller('employees')
@ApiTags('Employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) { }

  @ApiBearerAuth()
  @ApiResponse({ status: 400, description: 'Employee is exists in db - "BadRequestException"', type: Employee })
  @ApiResponse({ status: 500, description: 'Can n create Employee - Check Serve Logs - "InternalServerErrorException"', type: Employee })
  @Post()
  @Auth(validRoles.admin)
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeesService.create(createEmployeeDto);
  }
  
  @Auth()
  @Get()
  @ApiBearerAuth()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.employeesService.findAll(paginationDto);
  }
  @Auth()
  @Get(':search')
  @ApiBearerAuth()
  @ApiResponse({ status: 404, description: 'Employee with id or dni "###" not found - "NotFoundException"', type: Employee })
  findOne(@Param('search') search: string) {
    return this.employeesService.findOne(search);
  }


  @Auth(validRoles.admin)
  @Patch(':id')
  @ApiBearerAuth()
  @ApiResponse({ status: 404, description: 'Employee with id or dni "###" not found - "NotFoundException"', type: Employee })
  @ApiResponse({ status: 400, description: 'Employee is exists in db - "BadRequestException"', type: Employee })
  @ApiResponse({ status: 500, description: 'Can n create Employee - Check Serve Logs - "InternalServerErrorException"', type: Employee })
  update(@Param('id', ParseMongoIdPipe) id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeesService.update(id, updateEmployeeDto);
  }

  @ApiResponse({ status: 404, description: 'Employee with id or dni "###" not found - "NotFoundException"', type: Employee })
  @Auth(validRoles.admin)
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.employeesService.remove(id);
  }
}
