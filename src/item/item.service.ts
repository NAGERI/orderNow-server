import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateItemDto, UpdateItemDto } from './dto/item.dto';

@Injectable()
export class ItemService {
  constructor(private readonly prisma: PrismaService) {}

  async getItems(storeId: number) {
    try {
      return await this.prisma.item.findMany({
        where: { storeId },
      });
    } catch (error) {
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
      throw new HttpException(
        'Failed to create item',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateItem(id: number, data: UpdateItemDto) {
    try {
      return await this.prisma.item.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw new HttpException(
        'Failed to update item',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteItem(id: number) {
    try {
      return await this.prisma.item.delete({
        where: { id },
      });
    } catch (error) {
      throw new HttpException(
        'Failed to delete item',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
