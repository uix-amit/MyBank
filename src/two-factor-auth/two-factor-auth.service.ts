import { Injectable } from '@nestjs/common';
import { Prisma, TwoFactorAuth } from '@prisma/client';

import { PrismaService } from '@shared/services/prisma/prisma.service';

@Injectable()
export class TwoFactorAuthService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    createTwoFactorAuthDto: Prisma.TwoFactorAuthUncheckedCreateInput,
  ): Promise<TwoFactorAuth> {
    return await this.prismaService.twoFactorAuth.create({
      data: createTwoFactorAuthDto,
    });
  }

  async findAll(): Promise<TwoFactorAuth[]> {
    return await this.prismaService.twoFactorAuth.findMany();
  }

  async findOne(TwoFactorAuthID: string): Promise<TwoFactorAuth> {
    return await this.prismaService.twoFactorAuth.findFirst({
      where: { TwoFactorAuthID },
    });
  }

  async findOneByUserId(UserID: string): Promise<TwoFactorAuth> {
    return await this.prismaService.twoFactorAuth.findFirst({
      where: { UserID },
    });
  }

  async update(
    TwoFactorAuthID: string,
    updateTwoFactorAuthDto: Prisma.TwoFactorAuthUncheckedUpdateInput,
  ): Promise<TwoFactorAuth> {
    return await this.prismaService.twoFactorAuth.update({
      where: { TwoFactorAuthID },
      data: updateTwoFactorAuthDto,
    });
  }

  async remove(TwoFactorAuthID: string): Promise<TwoFactorAuth> {
    return await this.prismaService.twoFactorAuth.delete({
      where: { TwoFactorAuthID },
    });
  }

  async removeByUserID(UserID: string): Promise<any> {
    return await this.prismaService.twoFactorAuth.deleteMany({
      where: { UserID },
    });
  }
}
