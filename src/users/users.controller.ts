import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Users } from '@prisma/client';

import { UsersService } from '@users/users.service';
import { CreateUserDto } from '@users/dto/create-user-dto';
import { UpdateUserDto } from '@users/dto/update-user-dto';
import { IdValidationDto } from '@shared/validators/id-validation-dto';

@ApiTags('Users')
@Controller({ path: 'users', version: '1' })
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<Users> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  async findAll(): Promise<Users[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param() idValidationDto: IdValidationDto): Promise<Users> {
    return this.usersService.findOne(idValidationDto.id);
  }

  @Patch(':id')
  async update(
    @Param() idValidationDto: IdValidationDto,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<Users> {
    return this.usersService.update(idValidationDto.id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param() idValidationDto: IdValidationDto): Promise<Users> {
    return this.usersService.remove(idValidationDto.id);
  }
}
