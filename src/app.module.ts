import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { CommonModule } from './common/common.module';
import { EnvConfiguration } from './config/env.config';
import { JoiValidationSchema } from './config/joi.validation';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeesModule } from './employees/employees.module';
import { RolesModule } from './roles/roles.module';
import { UserModule } from './user/user.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    ConfigModule.forRoot( 
      {
        load: [EnvConfiguration],
        validationSchema: JoiValidationSchema 
      }
    ),
    MongooseModule.forRoot(process.env.MONGO_DB),
    CommonModule,
    AuthModule,
    EmployeesModule,
    RolesModule,
    UserModule,
    SeedModule
  ]
})
export class AppModule {}
