import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';
import { Cards } from '@prisma/client';

import { JwtAuthGuard } from '@auth/jwt-auth/jwt-auth.guard';
import { CardsService } from '@cards/cards.service';
import { CreateCardDto } from '@cards/dto/create-card-dto';
import { UpdateCardDto } from '@cards/dto/update-card-dto';
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
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  async create(@Body() createCardDto: CreateCardDto): Promise<Cards> {
    return this.cardsService.create(createCardDto);
  }

  @Get()
  async findAll(): Promise<Cards[]> {
    return this.cardsService.findAll();
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
