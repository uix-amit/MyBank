import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';

import { PrismaService } from '@sharedServices/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}
  create(createUserDto: Prisma.UserCreateInput): Promise<User> {
    return this.prismaService.user.create({ data: createUserDto });
  }

  findAll(): Promise<User[]> {
    return this.prismaService.user.findMany();
  }

  findOne(id: string): Promise<User> {
    return this.prismaService.user.findFirst({
      where: {
        id,
      },
    });
  }

  update(id: string, updateUserDto: Prisma.UserUpdateInput) {
    return this.prismaService.user.update({
      where: {
        id,
      },
      data: updateUserDto,
    });
  }

  remove(id: string) {
    return this.prismaService.user.delete({
      where: {
        id,
      },
    });
  }
}
