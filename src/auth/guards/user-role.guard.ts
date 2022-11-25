import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ForbiddenException, InternalServerErrorException } from '@nestjs/common/exceptions';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { User } from 'src/User/entities/User.entity';
import { META_ROLES } from '../decorators/role-protected.decorator';

@Injectable()
export class UserRoleGuard implements CanActivate {

  constructor(
    private readonly reflector: Reflector
  ) {

  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const validRoles: string[] = this.reflector.get(META_ROLES, context.getHandler()); 
    if(!validRoles || validRoles.length == 0) return true;
    const req = context.switchToHttp().getRequest();
    const user = req.user as User;
    if (!user) {
      throw new InternalServerErrorException('User not found (request)');
    }

    for (const role of user.roles) {
       var roles = role['name'];
       if(validRoles.includes(roles)){
        return true;
       }
    }
    throw new ForbiddenException(`User ${user.username} need a valid role: ${validRoles}`)
  }
}
