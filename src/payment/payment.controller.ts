import { Controller, Post, Body, UseGuards } from '@nestjs/common';

import { PaymentDto } from './dto/payment.dto';
import { JwtAuthGuard } from 'src/utils/jwt-auth.guard';
import { PaymentService } from './payment.service';

@UseGuards(JwtAuthGuard)
@Controller('api/v1/payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  async processPayment(@Body() paymentDto: PaymentDto) {
    return this.paymentService.processPayment(paymentDto);
  }
}
