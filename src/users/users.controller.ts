import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';
import { Users } from '@prisma/client';

import { AccountPreferencesService } from '@accountPreferences/account-preferences.service';
import { IsPublic } from '@auth/is-public/is-public.decorator';
import { IdValidationDto } from '@shared/validators/id-validation-dto';
import { CreateUserDto } from '@users/dto/create-user-dto';
import { UpdateUserDto } from '@users/dto/update-user-dto';
import { UsersService } from '@users/users.service';
import { JwtAuthGuard } from '@auth/jwt-auth/jwt-auth.guard';

@ApiTags('Users')
@ApiBearerAuth('Authorization')
@Controller({ path: 'users', version: '1' })
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly accountPreferencesService: AccountPreferencesService,
  ) {}

  @IsPublic()
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<Users> {
    const user = await this.usersService.create(createUserDto);
    this.accountPreferencesService.create({
      UserID: user.UserID,
    });
    return user;
  }

  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
    required: true,
  })
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Request() req: any): Promise<Users> {
    return this.usersService.findOne(req.user.UserID);
  }

  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
    required: true,
  })
  @Get(':id')
  async findOne(@Param() idValidationDto: IdValidationDto): Promise<Users> {
    return this.usersService.findOne(idValidationDto.id);
  }

  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
    required: true,
  })
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param() idValidationDto: IdValidationDto,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<Users> {
    return this.usersService.update(idValidationDto.id, updateUserDto);
  }

  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
    required: true,
  })
  @Delete(':id')
  async remove(@Param() idValidationDto: IdValidationDto): Promise<Users> {
    return this.usersService.remove(idValidationDto.id);
  }
}
