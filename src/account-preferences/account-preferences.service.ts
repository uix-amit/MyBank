import { Injectable } from '@nestjs/common';
import { Prisma, AccountPreferences } from '@prisma/client';

import { PrismaService } from '@shared/services/prisma/prisma.service';

@Injectable()
export class AccountPreferencesService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    createAccountPreferenceDto: Prisma.AccountPreferencesCreateInput,
  ): Promise<AccountPreferences> {
    return await this.prismaService.accountPreferences.create({
      data: createAccountPreferenceDto,
    });
  }

  async findAll(): Promise<AccountPreferences[]> {
    return await this.prismaService.accountPreferences.findMany();
  }

  async findOne(AccountPreferenceID: string): Promise<AccountPreferences> {
    return await this.prismaService.accountPreferences.findFirst({
      where: { AccountPreferenceID },
    });
  }

  async update(
    AccountPreferenceID: string,
    updateAccountPreferenceDto: Prisma.AccountPreferencesUpdateInput,
  ): Promise<AccountPreferences> {
    return await this.prismaService.accountPreferences.update({
      where: { AccountPreferenceID },
      data: updateAccountPreferenceDto,
    });
  }

  async remove(AccountPreferenceID: string): Promise<AccountPreferences> {
    return await this.prismaService.accountPreferences.delete({
      where: { AccountPreferenceID },
    });
  }
}
