import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateOrderDto, UpdateOrderDto } from './dto/order.dto';
import { Order, Prisma } from '@prisma/client';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}
  logger = new Logger('Order Service');
  async getOrders(userId: number) {
    try {
      return await this.prisma.order.findMany({
        where: { userId },
        include: { item: true, store: true },
      });
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        'Failed to fetch orders',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getItemPrice(id: Number): Promise<number> {
    const item = await this.prisma.item.findUnique({
      where: { id: Number(id) },
      select: { price: true },
    });
    this.logger.log(item);
    if (!item) {
      throw new Error(`Item with id ${id} not found`);
    }

    return item.price;
  }
  // TODO the connect is not necessary. DEBUG
  async createOrder(data: any): Promise<Order> {
    try {
      const itemPrice = await this.getItemPrice(data.itemId);
      let totalAmount = Number(itemPrice * data.quantity);
      data = {
        ...data,
        totalAmount,
    
      };
      return await this.prisma.order.create({ data });
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        'Failed to create order',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateOrder(id: number, data: UpdateOrderDto) {
    try {
      return await this.prisma.order.update({
        where: { id },
        data,
      });
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        'Failed to update order',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteOrder(id: number) {
    try {
      return await this.prisma.order.delete({
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
