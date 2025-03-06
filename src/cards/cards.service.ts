import { Injectable } from '@nestjs/common';
import { Cards, Prisma } from '@prisma/client';

import { PrismaService } from '../shared/services/prisma/prisma.service';

@Injectable()
export class CardsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    createCardDto: Prisma.CardsUncheckedCreateInput,
  ): Promise<Cards> {
    return await this.prismaService.cards.create({ data: createCardDto });
  }

  async findAll(UserID: string): Promise<{
    Accounts: {
      Cards: Cards[];
    }[];
  }> {
    return await this.prismaService.users.findUnique({
      where: { UserID },
      select: {
        FirstName: true,
        LastName: true,
        Accounts: {
          where: {
            Cards: {
              some: {}, // This filters accounts that have at least one card
            },
          },
          select: {
            Cards: true,
            Bank: {
              select: {
                BankName: true,
              },
            },
            AccountNumber: true,
          },
        },
      },
    });
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
