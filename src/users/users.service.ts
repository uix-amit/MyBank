import { Injectable } from '@nestjs/common';
import { Prisma, Users } from '@prisma/client';

import { PrismaService } from '@sharedServices/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createUserDto: Prisma.UsersUncheckedCreateInput): Promise<Users> {
    return this.prismaService.users.create({ data: createUserDto });
  }

  findAll(): Promise<Users[]> {
    return this.prismaService.users.findMany();
  }

  findOne(UserID: string): Promise<Omit<Users, 'Password'>> {
    return this.prismaService.users.findFirst({
      where: {
        UserID,
      },
      select: {
        UserID: true,
        FirstName: true,
        LastName: true,
        Email: true,
        UserName: true,
        PhoneNumber: true,
        DateOfBirth: true,
        CreatedAt: true,
        UpdatedAt: true,
      },
    });
  }

  findOneByUsername(UserName: string): Promise<Users> {
    return this.prismaService.users.findFirst({
      where: {
        UserName,
      },
    });
  }

  update(UserID: string, updateUserDto: Prisma.UsersUncheckedUpdateInput) {
    return this.prismaService.users.update({
      where: {
        UserID,
      },
      data: updateUserDto,
    });
  }

  async remove(UserID: string) {
    await this.prismaService.accountPreferences.delete({
      where: {
        UserID,
      },
    });
    return this.prismaService.users.delete({
      where: {
        UserID,
      },
    });
  }
}
