import { forwardRef, Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Employee, EmployeeSchema } from './entities/employee.entity';
import { RolesModule } from '../roles/roles.module';
import { AuthModule } from '../auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [EmployeesController],
  providers: [EmployeesService],
  imports:[
    ConfigModule,
    MongooseModule.forFeature([
      {
       name: Employee.name,
       schema: EmployeeSchema,
      }
     ]),
     forwardRef(() => RolesModule),
     forwardRef(() => AuthModule),

  ],
  exports: [MongooseModule, EmployeesService]
})
export class EmployeesModule {}
