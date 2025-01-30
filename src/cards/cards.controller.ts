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

import { JwtAuthGuard } from '@auth/jwt-auth/jwt-auth.guard';
import { CardsService } from '@cards/cards.service';
import { CreateCardDto } from '@cards/dto/create-card-dto';
import { UpdateCardDto } from '@cards/dto/update-card-dto';
import { NotificationsService } from '@notifications/notifications.service';
import { IdValidationDto } from '@shared/validators/id-validation-dto';

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
  ): Promise<Cards> {
    const card = await this.cardsService.create(createCardDto);
    this.notificationsService.create({
      Message: `Congratulations! Your new card ${card.CardNumber} has been created successfully.`,
      UserID: req.user.UserID,
    });
    return card;
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
