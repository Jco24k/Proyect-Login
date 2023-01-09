import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';
import { EmployeesModule } from '../employees/employees.module';
import { EmployeesService } from '../employees/employees.service';
import { Employee } from '../employees/entities/employee.entity';
import { Role } from '../roles/entities/role.entity';
import { RolesModule } from '../roles/roles.module';
import { RolesService } from '../roles/roles.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User } from '../User/entities/User.entity';
import { UserService } from '../user/user.service';
import { initialData } from './data/seed-data';


@Injectable()
export class SeedService {

  promises: Promise<User | Role | Employee>[] = [];

  constructor(
    @InjectModel(Employee.name)
    private readonly employeeModel: Model<Employee>,
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    @InjectModel(Role.name)
    private readonly roleModel: Model<Role>,
    private readonly employeeService: EmployeesService,
    private readonly roleService: RolesService,

  ) {

  }

  async seedExecute() {
    await this.deleteTables();
    const roles = await this.insertNewRoles();
    const employeesIds: Types.ObjectId[] = await this.insertNewEmployees();
    const userRegister = await this.insertNewUsers(roles, employeesIds);
    return `This action returns all seed`;
  }

  private async insertNewRoles() {
    this.promises = [];
    const roles = initialData.roles;
    roles.forEach(role => {
      this.promises.push(this.roleService.create(role))
    })
    await Promise.all(this.promises);
    return await this.roleService.findAll();
  }

  private async insertNewEmployees() {
    this.promises = [];
    const employees = initialData.employees;
    employees.forEach(emp => {
      this.promises.push(this.employeeService.create(emp))
    })
    await Promise.all(this.promises);
    return (await this.employeeModel.find({})).map((emp) => emp._id);
  }

  private async insertNewUsers(roles, idEmployees: Types.ObjectId[]) {
    this.promises = [];
    const users = initialData.users;
    users.forEach((user, index) => {
      this.promises.push(this.userModel.create({
        ...user, roles, id_employee: idEmployees.at(index)
      }));
    })
    await Promise.all(this.promises);
    return true;
  }

  private async deleteTables() {
    const listTables = [];
    listTables.push( await this.roleModel.deleteMany({}));
    listTables.push( await this.employeeModel.deleteMany({}));    
    listTables.push( await this.userModel.deleteMany({}));    

    await Promise.all( listTables);

  }
}
