import { forwardRef, Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { UserModule } from 'src/user/user.module';
import { EmployeesModule } from 'src/employees/employees.module';
import { RolesModule } from 'src/roles/roles.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports:[
    forwardRef(() => UserModule),
    forwardRef(() => EmployeesModule),
    forwardRef(() => RolesModule),
  ]
})
export class SeedModule {}
