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
import { Cards } from '@prisma/client';

import { CardsService } from '@cards/cards.service';
import { CreateCardDto } from '@cards/dto/create-card-dto';
import { UpdateCardDto } from '@cards/dto/update-card-dto';

@ApiTags('Cards')
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
  async findOne(@Param('id') id: string): Promise<Cards> {
    return this.cardsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCardDto: UpdateCardDto,
  ): Promise<Cards> {
    return this.cardsService.update(id, updateCardDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Cards> {
    return this.cardsService.remove(id);
  }
}
