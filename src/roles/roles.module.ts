import { forwardRef, Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Role, RoleSchema } from './entities/role.entity';
import { UserModule } from '../user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      {
       name: Role.name,
       schema: RoleSchema,
      }
     ]),
     forwardRef(() => UserModule),
     forwardRef(()=> AuthModule)

  ],
  exports: [MongooseModule,RolesService]
})
export class RolesModule {}
