import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Auth, validRoles } from 'src/auth/interfaces';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/User.entity';
import { string } from 'joi';

@Controller('user')
@ApiTags('User')
@Auth(validRoles.superUser,validRoles.admin)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiBearerAuth()
  @ApiResponse({ status: 400, description: 'User is exists in db - "BadRequestException"', type:User })
  @ApiResponse({ status: 500, description: 'Can n create User - Check Serve Logs - "InternalServerErrorException"', type:User })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiBearerAuth()
  @Get()
  findAll(@Query() paginationDto:PaginationDto) {
    return this.userService.findAll(paginationDto);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 404, description: 'User with id or username "###" not found - "NotFoundException"', type: User })
  @Get(':search')
  findOne(@Param('search') search: string) {
    return this.userService.findOne(search);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiResponse({ status: 404, description: 'User with id or username "###" not found - "NotFoundException"', type: User })
  @ApiResponse({ status: 400, description: 'User is exists in db - "BadRequestException"', type:User })
  @ApiResponse({ status: 500, description: 'Can n create User - Check Serve Logs - "InternalServerErrorException"', type:User })
  @ApiParam({name: "id",type: String})
  update(@Param('id',ParseMongoIdPipe) id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @ApiResponse({ status: 404, description: 'User with id "###" not found - "NotFoundException"', type: User })
  @ApiBearerAuth()
  @ApiParam({name: "id",type: String})
  @Delete(':id')
  remove(@Param('id',ParseMongoIdPipe) id: string) {
    return this.userService.remove(id);
  }
}
