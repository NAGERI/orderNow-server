import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { PrismaService } from 'src/prisma.service';
import { OrderService } from 'src/order/order.service';

@Module({
  controllers: [PaymentController],
  providers: [PaymentService, PrismaService, OrderService],
})
export class PaymentModule {}
