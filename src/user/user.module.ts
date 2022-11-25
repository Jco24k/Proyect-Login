import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { RolesModule } from 'src/roles/roles.module';
import { EmployeesModule } from 'src/employees/employees.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports:[
    ConfigModule,
    MongooseModule.forFeature([
      {
       name: User.name,
       schema: UserSchema,
      }
     ]),
     forwardRef(() => RolesModule),
     forwardRef(() => EmployeesModule),
     forwardRef(() => AuthModule),


  ],
  exports:[MongooseModule, UserService]
})
export class UserModule {}
