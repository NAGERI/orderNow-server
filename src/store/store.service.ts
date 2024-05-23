import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UpdateStoreDto } from './dto/store.dto';

@Injectable()
export class StoreService {
  constructor(private readonly prisma: PrismaService) {}
  private logger = new Logger('StoreService');

  async getStores(adminId: number) {
    try {
      return await this.prisma.store.findMany({
        where: { adminId },
      });
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        'Failed to fetch stores',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getStoreById(id: number) {
    try {
      this.logger.log(`Getting Sore with ID ${id}`);
      return await this.prisma.store.findUniqueOrThrow({
        where: { id },
      });
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        'Failed to fetch stores',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAllStores() {
    try {
      return await this.prisma.store.findMany();
    } catch (error) {
      this.logger.error(error);
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
  }): Promise<any> {
    try {
      return await this.prisma.store.create({
        data,
      });
    } catch (error) {
      this.logger.error(error);
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
      this.logger.error(error);
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
      this.logger.error(error);
      throw new HttpException(
        'Failed to delete store',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
