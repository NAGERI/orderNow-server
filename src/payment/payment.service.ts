import { Injectable, Logger } from '@nestjs/common';

import { OrderService } from '../order/order.service';
import { PaymentDto } from './dto/payment.dto';
import { PrismaService } from 'src/prisma.service';
import { OrderStatus } from '@prisma/client';

@Injectable()
export class PaymentService {
  constructor(
    private prisma: PrismaService,
    private orderService: OrderService,
  ) {}
  logger = new Logger('Order-Item Service');
  async processPayment(paymentDto: PaymentDto) {
    // Should have a payment gateway integration here
    const order = await this.orderService.findOne(paymentDto.orderId);
    if (!order) {
      throw new Error('Order not found');
    }
    this.logger.log(`PAYMENT FOR order# ${order.id}`);
    // Mock payment processing
    const paymentStatus = OrderStatus.COMPLETED;

    if (paymentStatus === OrderStatus.COMPLETED) {
      await this.prisma.order.update({
        where: { id: paymentDto.orderId },
        data: { status: OrderStatus.COMPLETED },
      });

      return { message: 'Payment successful', orderId: paymentDto.orderId };
    } else {
      throw new Error('Payment failed');
    }
  }
}
