import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateOrderItemDto, UpdateOrderItemDto } from './dto/order-item.dto';

@Injectable()
export class OrderItemService {
  constructor(private readonly prisma: PrismaService) {}
  logger = new Logger('Order-Item Service');

  async create(createOrderItemDto: CreateOrderItemDto) {
    try {
      return this.prisma.orderItem.create({
        data: createOrderItemDto,
      });
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        'Failed to Create order',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    try {
      return this.prisma.orderItem.findMany({
        include: {
          item: true,
          order: true,
        },
      });
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        'Failed to find All orders',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: string) {
    try {
      return this.prisma.orderItem.findUnique({
        where: { id },
        include: {
          item: true,
          order: true,
        },
      });
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        'Failed to find one order',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: string, updateOrderItemDto: UpdateOrderItemDto) {
    try {
      return this.prisma.orderItem.update({
        where: { id },
        data: updateOrderItemDto,
      });
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        'Failed to update order',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: string) {
    try {
      return this.prisma.orderItem.delete({
        where: { id },
      });
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        'Failed to delete order',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
