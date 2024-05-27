import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto, UpdateOrderDto } from './dto/order.dto';
import { JwtAuthGuard } from 'src/utils/jwt-auth.guard';

@Controller('api/v1/orders')
@UseGuards(JwtAuthGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get(':id/status-and-quantity')
  async getOrderStatusAndTotalQuantity(@Param('id') id: string) {
    return this.orderService.getOrderStatusAndTotalQuantity(id);
  }

  // TODO provide: storeId and items[]
  @Post()
  async create(@Body() createOrderDto: CreateOrderDto, @Request() req) {
    return this.orderService.create({ ...createOrderDto, userId: req.user.id });
  }

  @Get()
  async findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return this.orderService.update(id, updateOrderDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.orderService.remove(id);
  }
}
