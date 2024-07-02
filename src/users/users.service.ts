import { Injectable } from '@nestjs/common';
import { Prisma, Users } from '@prisma/client';

import { PrismaService } from '@sharedServices/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createUserDto: Prisma.UsersCreateInput): Promise<Users> {
    return this.prismaService.users.create({ data: createUserDto });
  }

  findAll(): Promise<Users[]> {
    return this.prismaService.users.findMany();
  }

  findOne(UserID: string): Promise<Users> {
    return this.prismaService.users.findFirst({
      where: {
        UserID,
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

  update(UserID: string, updateUserDto: Prisma.UsersUpdateInput) {
    return this.prismaService.users.update({
      where: {
        UserID,
      },
      data: updateUserDto,
    });
  }

  remove(UserID: string) {
    return this.prismaService.users.delete({
      where: {
        UserID,
      },
    });
  }
}
