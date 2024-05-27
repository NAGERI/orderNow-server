import {
  Injectable,
  HttpException,
  HttpStatus,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateStoreDto, STORESTATUS, UpdateStoreDto } from './dto/store.dto';

@Injectable()
export class StoreService {
  constructor(private readonly prisma: PrismaService) {}
  private logger = new Logger('StoreService');

  async getStores(adminId: string) {
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

  async findOne(id: string) {
    try {
      this.logger.log(`Getting Sore with ID ${id}`);
      const store = await this.prisma.store.findUnique({
        where: { id },
        include: {
          items: true,
        },
      });
      if (!store) {
        throw new NotFoundException(`Store with ID ${id} not found`);
      }

      return store;
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        'Failed to fetch store',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    try {
      return await this.prisma.store.findMany({
        include: {
          items: true,
        },
      });
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        'Failed to fetch stores',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async create(data: any): Promise<any> {
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

  async update(id: string, data: UpdateStoreDto) {
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

  async deactivateStore(id: string) {
    try {
      return await this.prisma.store.update({
        where: { id },
        data: { status: STORESTATUS.INACTIVE },
      });
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        'Failed to deactivate store',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: string) {
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
