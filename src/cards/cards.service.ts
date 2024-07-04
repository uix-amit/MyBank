import { Injectable } from '@nestjs/common';
import { Prisma, Cards } from '@prisma/client';

import { PrismaService } from '@sharedServices/prisma/prisma.service';

@Injectable()
export class CardsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    createCardDto: Prisma.CardsUncheckedCreateInput,
  ): Promise<Cards> {
    return await this.prismaService.cards.create({ data: createCardDto });
  }

  async findAll(): Promise<Cards[]> {
    return await this.prismaService.cards.findMany();
  }

  async findOne(CardID: string): Promise<Cards> {
    return await this.prismaService.cards.findFirst({ where: { CardID } });
  }

  async update(
    CardID: string,
    updateCardDto: Prisma.CardsUncheckedUpdateInput,
  ): Promise<Cards> {
    return await this.prismaService.cards.update({
      where: { CardID },
      data: updateCardDto,
    });
  }

  async remove(CardID: string): Promise<Cards> {
    return await this.prismaService.cards.delete({ where: { CardID } });
  }
}
