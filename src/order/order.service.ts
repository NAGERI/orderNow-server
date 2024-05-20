import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateOrderDto, UpdateOrderDto } from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  async getOrders(userId: number) {
    try {
      return await this.prisma.order.findMany({
        where: { userId },
        include: { item: true, store: true },
      });
    } catch (error) {
      throw new HttpException(
        'Failed to fetch orders',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createOrder(data: any) {
    try {
      return await this.prisma.order.create({
        data,
      });
    } catch (error) {
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
      throw new HttpException(
        'Failed to delete order',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}