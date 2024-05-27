import {
  Injectable,
  HttpException,
  HttpStatus,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateItemDto, UpdateItemDto } from './dto/item.dto';

@Injectable()
export class ItemService {
  constructor(private readonly prisma: PrismaService) {}
  private logger = new Logger('ItemService');

  async getItems(storeId: string) {
    try {
      return await this.prisma.item.findMany({
        where: { storeId },
      });
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        'Failed to fetch items',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async findAll() {
    try {
      return await this.prisma.item.findMany();
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        'Failed to fetch items',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: string) {
    try {
      const item = await this.prisma.item.findUnique({
        where: { id },
      });

      if (!item) {
        throw new NotFoundException(`Item with ID ${id} not found`);
      }

      return item;
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        'Failed to fetch items',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createItem(data: CreateItemDto) {
    try {
      return await this.prisma.item.create({
        data,
      });
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        'Failed to create item',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateItem(id: string, data: UpdateItemDto) {
    try {
      return await this.prisma.item.update({
        where: { id },
        data,
      });
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        'Failed to update item',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteItem(id: string) {
    try {
      return await this.prisma.item.delete({
        where: { id },
      });
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        'Failed to delete item',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
