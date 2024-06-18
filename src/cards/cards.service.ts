import { Injectable } from '@nestjs/common';
import { Prisma, Card } from '@prisma/client';

import { PrismaService } from '@sharedServices/prisma/prisma.service';

@Injectable()
export class CardsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createCardDto: Prisma.CardCreateInput): Promise<Card> {
    return await this.prismaService.card.create({ data: createCardDto });
  }

  async findAll(): Promise<Card[]> {
    return await this.prismaService.card.findMany();
  }

  async findOne(id: string): Promise<Card> {
    return await this.prismaService.card.findFirst({ where: { id } });
  }

  async update(
    id: string,
    updateCardDto: Prisma.CardUpdateInput,
  ): Promise<Card> {
    return await this.prismaService.card.update({
      where: { id },
      data: updateCardDto,
    });
  }

  async remove(id: string): Promise<Card> {
    return await this.prismaService.card.delete({ where: { id } });
  }
}
