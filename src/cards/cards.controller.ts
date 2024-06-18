import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Card, Prisma } from '@prisma/client';

import { CardsService } from '@cards/cards.service';

@Controller({ path: 'cards', version: '1' })
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  async create(@Body() createCardDto: Prisma.CardCreateInput): Promise<Card> {
    return this.cardsService.create(createCardDto);
  }

  @Get()
  async findAll(): Promise<Card[]> {
    return this.cardsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Card> {
    return this.cardsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCardDto: Prisma.CardUpdateInput,
  ): Promise<Card> {
    return this.cardsService.update(id, updateCardDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Card> {
    return this.cardsService.remove(id);
  }
}
