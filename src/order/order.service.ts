import {
  Injectable,
  HttpException,
  HttpStatus,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateOrderDto, UpdateOrderDto } from './dto/order.dto';
import { OrderStatus } from '@prisma/client';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}
  logger = new Logger('Order Service');

  async getOrderStatusAndTotalQuantity(orderId: string) {
    try {
      const order = await this.prisma.order.findUnique({
        where: { id: orderId },
        include: {
          orderItems: {
            include: {
              item: true,
            },
          },
        },
      });

      if (!order) {
        throw new NotFoundException('Order not found');
      }

      const totalQuantity = order.orderItems.reduce(
        (total, orderItem) => total + orderItem.quantity,
        0,
      );

      return {
        status: totalQuantity > 0 ? 'PENDING' : 'COMPLETED',
        totalQuantity,
      };
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        'Failed to get order status',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async create(createOrderDto: CreateOrderDto) {
    try {
      const { userId, storeId, items } = createOrderDto;

      return this.prisma.$transaction(async (prisma) => {
        const order = await prisma.order.create({
          data: {
            userId,
            storeId,
            status: OrderStatus.PENDING,
          },
        });

        const orderItems = items.map((item) => ({
          orderId: order.id,
          itemId: item.itemId,
          quantity: item.quantity,
        }));

        await prisma.orderItem.createMany({
          data: orderItems,
        });

        return order;
      });
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        'Failed to create order',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    try {
      return await this.prisma.order.findMany({
        include: {
          orderItems: {
            include: {
              item: true,
            },
          },
        },
      });
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        'Failed to find all order',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: string) {
    try {
      return await this.prisma.order.findUnique({
        where: { id },
        include: {
          orderItems: {
            include: {
              item: true,
            },
          },
        },
      });
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        'Failed to get the order',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    try {
      return await this.prisma.order.update({
        where: { id },
        data: updateOrderDto,
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
