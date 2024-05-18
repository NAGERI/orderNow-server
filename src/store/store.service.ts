import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UpdateStoreDto } from './dto/store.dto';

@Injectable()
export class StoreService {
  constructor(private readonly prisma: PrismaService) {}

  async getStores(adminId: number) {
    try {
      return await this.prisma.store.findMany({
        where: { adminId },
      });
    } catch (error) {
      throw new HttpException(
        'Failed to fetch stores',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createStore(data: {
    adminId: number;
    name: string;
    description?: string;
  }) {
    try {
      return await this.prisma.store.create({
        data,
      });
    } catch (error) {
      throw new HttpException(
        'Failed to create store',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateStore(id: number, data: UpdateStoreDto) {
    try {
      return await this.prisma.store.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw new HttpException(
        'Failed to update store',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteStore(id: number) {
    try {
      return await this.prisma.store.delete({
        where: { id },
      });
    } catch (error) {
      throw new HttpException(
        'Failed to delete store',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
