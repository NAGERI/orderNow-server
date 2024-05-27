import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  private logger = new Logger('UserService');

  async findOneByEmail(username: string) {
    this.logger.log('Finding One User by Email/Username');
    return await this.prisma.user.findUnique({
      where: { username },
    });
  }

  async deleteUser(id) {
    try {
      return await this.prisma.user.delete({
        where: { id },
      });
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        'Failed to delete user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateUser(id: any, data: UpdateUserDto) {
    try {
      return await this.prisma.user.update({
        where: { id },
        data,
      });
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        'Failed to update user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getUsers(params?: { where?: Prisma.UserWhereInput }): Promise<any> {
    const { where } = params;
    const res = await this.prisma.user.findMany({
      where,
      select: {
        id: true,
        username: true,
        role: true,
      },
    });

    return res;
  }

  async getAllUsers(): Promise<any> {
    try {
      return await this.prisma.user.findMany({
        select: {
          id: true,
          username: true,
          role: true,
        },
      });
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        'Failed to Get users',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createUser(data: CreateUserDto) {
    try {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      return await this.prisma.user.create({
        data: {
          ...data,
          password: hashedPassword,
        },
      });
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        'Failed to create user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
