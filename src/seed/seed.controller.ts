import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SeedService } from './seed.service';


@Controller('seed')
@ApiTags('SeedExecute')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
  seedExecute() {
    return this.seedService.seedExecute();
  }

}
