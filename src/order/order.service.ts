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

  async getOrderStatusAndTotalQuantity(userId: string) {
    try {
      const orders = await this.prisma.order.findMany({
        where: { userId: userId },
        include: {
          orderItems: {
            include: {
              item: true,
            },
          },
        },
      });

      if (!orders) {
        throw new NotFoundException('Order not found');
      }

      function calculateTotalSum(orders) {
        return orders.reduce((totalSum, order) => {
          const orderTotal = order.orderItems.reduce((sum, orderItems) => {
            return sum + orderItems.item.price * orderItems.quantity;
          }, 0);
          return totalSum + orderTotal;
        }, 0);
      }

      const totalSum = calculateTotalSum(orders);

      return {
        status: totalSum > 0 ? 'PENDING' : 'COMPLETED',
        totalSum,
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
  async findByUser(userId: string) {
    try {
      return await this.prisma.order.findMany({
        where: { userId },
        include: {
          Store: true,
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
        'Failed to fetch logged In User order',
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
