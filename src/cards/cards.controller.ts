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
import { Cards } from '@prisma/client';

import { JwtAuthGuard } from '../auth/jwt-auth/jwt-auth.guard';
import { NotificationsService } from '../notifications/notifications.service';
import { IdValidationDto } from '../shared/validators/id-validation-dto';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card-dto';
import { UpdateCardDto } from './dto/update-card-dto';

@ApiTags('Cards')
@ApiBearerAuth('Authorization')
@ApiHeader({
  name: 'Authorization',
  description: 'Bearer token',
  required: true,
})
@UseGuards(JwtAuthGuard)
@Controller({ path: 'cards', version: '1' })
export class CardsController {
  constructor(
    private readonly cardsService: CardsService,
    private readonly notificationsService: NotificationsService,
  ) {}

  @Post()
  async create(
    @Request() req: any,
    @Body() createCardDto: CreateCardDto,
  ): Promise<{ message: string }> {
    await this.cardsService.create(createCardDto);
    const message: string = `Congratulations! Your new card ${createCardDto.CardNumber} has been created successfully.`;
    this.notificationsService.create({
      Message: message,
      UserID: req.user.UserID,
    });
    return { message };
  }

  @Get()
  async findAll(@Request() req: any): Promise<{
    Accounts: {
      Cards: Cards[];
    }[];
  }> {
    return this.cardsService.findAll(req.user.UserID);
  }

  @Get(':id')
  async findOne(@Param() idValidationDto: IdValidationDto): Promise<Cards> {
    return this.cardsService.findOne(idValidationDto.id);
  }

  @Patch(':id')
  async update(
    @Param() idValidationDto: IdValidationDto,
    @Body() updateCardDto: UpdateCardDto,
  ): Promise<Cards> {
    return this.cardsService.update(idValidationDto.id, updateCardDto);
  }

  @Delete(':id')
  async remove(@Param() idValidationDto: IdValidationDto): Promise<Cards> {
    return this.cardsService.remove(idValidationDto.id);
  }
}
