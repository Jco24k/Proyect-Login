import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { GetUser } from './decorators/get-user.decorator';
import { AuthUserDto } from './dto/auth-user.dto';
import { Auth, validRoles } from './interfaces';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post()
  @ApiResponse({ status: 401, description: 'Auth UnauthorizedException', type: AuthUserDto })
  @HttpCode(200)
  signIn(@Body() loginUserDto: AuthUserDto) {
    return this.authService.auth(loginUserDto);
  }

}
