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
import { JwtAuthGuard } from '@auth/jwt-auth/jwt-auth.guard';
import { NotificationsService } from '@notifications/notifications.service';
import { PasswordService } from '@shared/password/password.service';
import { IdValidationDto } from '@shared/validators/id-validation-dto';
import { CreateUserDto } from '@users/dto/create-user-dto';
import { UpdateUserDto } from '@users/dto/update-user-dto';
import { UsersService } from '@users/users.service';

@ApiTags('Users')
@ApiBearerAuth('Authorization')
@Controller({ path: 'users', version: '1' })
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly accountPreferencesService: AccountPreferencesService,
    private readonly notificationsService: NotificationsService,
    private readonly passwordService: PasswordService,
  ) {}

  @IsPublic()
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<Users> {
    const hashedPassword = await this.passwordService.hashPassword(
      createUserDto.Password,
    );
    const user = await this.usersService.create({
      ...createUserDto,
      Password: hashedPassword,
    });
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
    @Request() req: any,
    @Param() idValidationDto: IdValidationDto,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<Users> {
    let hashedPassword = null;
    if (updateUserDto.Password) {
      hashedPassword = await this.passwordService.hashPassword(
        updateUserDto.Password,
      );
    }
    const user = await this.usersService.update(idValidationDto.id, {
      ...updateUserDto,
      ...(updateUserDto.Password && { Password: hashedPassword }),
    });
    this.notificationsService.create({
      UserID: req.user.UserID,
      Message: `Dear ${user.FirstName} ${user.LastName}, your ${updateUserDto.Password ? 'password' : 'profile'} has been updated successfully!`,
    });
    return user;
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
