import { Injectable } from '@nestjs/common';
import { AccountPreference, Prisma } from '@prisma/client';

import { PrismaService } from '@sharedServices/prisma/prisma.service';

@Injectable()
export class SettingsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    createSettingDto: Prisma.AccountPreferenceCreateInput,
  ): Promise<AccountPreference> {
    return await this.prismaService.accountPreference.create({
      data: createSettingDto,
    });
  }

  async findAll(): Promise<AccountPreference[]> {
    return await this.prismaService.accountPreference.findMany();
  }

  async findOne(id: string): Promise<AccountPreference> {
    return await this.prismaService.accountPreference.findFirst();
  }

  async update(
    id: string,
    updateSettingDto: Prisma.AccountPreferenceUpdateInput,
  ): Promise<AccountPreference> {
    return await this.prismaService.accountPreference.update({
      where: { id },
      data: updateSettingDto,
    });
  }

  async remove(id: string): Promise<AccountPreference> {
    return await this.prismaService.accountPreference.delete({ where: { id } });
  }
}
