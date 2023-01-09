import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ParseMongoIdPipe } from '../common/pipes/parse-mongo-id.pipe';
import { Auth, validRoles } from '../auth/interfaces';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from './entities/role.entity';

@Controller('roles')
@ApiTags('Roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @ApiBearerAuth()
  @Post()
  @Auth(validRoles.admin)
  @ApiResponse({ status: 400, description: 'Role is exists in db - "BadRequestException"', type: Role })
  @ApiResponse({ status: 500, description: 'Can n create Role - Check Serve Logs - "InternalServerErrorException"', type: Role })
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @ApiBearerAuth()
  @Get()
  @Auth()
  findAll() {
    return this.rolesService.findAll();
  }

  @ApiBearerAuth()
  @Get(':search')
  @Auth()
  @ApiResponse({ status: 404, description: 'Role with id or dni "###" not found - "NotFoundException"', type: Role })
  findOne(@Param('search') search: string) {
    return this.rolesService.findOne(search);
  }

  @ApiBearerAuth()
  @Auth(validRoles.admin)
  @Patch(':id')
  @ApiResponse({ status: 404, description: 'Role with id or dni "###" not found - "NotFoundException"', type: Role })
  @ApiResponse({ status: 400, description: 'Role is exists in db - "BadRequestException"', type: Role })
  @ApiResponse({ status: 500, description: 'Can n create Role - Check Serve Logs - "InternalServerErrorException"', type: Role })
  update(@Param('id',ParseMongoIdPipe) id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(id, updateRoleDto);
  }

  @ApiBearerAuth()
  @Auth(validRoles.admin)
  @Delete(':id')
  @ApiResponse({ status: 404, description: 'Role with id "###" not found - "NotFoundException"', type: Role })
  @ApiResponse({ status: 500, description: 'Role with id "###" cannot be deleted because it is in use. - "InternalServerErrorException"', type: Role })
  remove(@Param('id',ParseMongoIdPipe) id: string) {
    return this.rolesService.remove(id);
  }
}
