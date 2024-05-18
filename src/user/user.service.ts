import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AuthCredentialsDto } from 'src/auth/dto/authCredentials.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  private logger = new Logger('UserService');

  async getUsers(params?: { where?: Prisma.UserWhereInput }): Promise<any> {
    const { where } = params;
    const res = await this.prisma.user.findMany({ where });
  }
  async createUser(data: AuthCredentialsDto): Promise<any> {
    this.logger.verbose('User created');
    const res = await this.prisma.user.create({
      data,
    });
    return res;
  }
}
