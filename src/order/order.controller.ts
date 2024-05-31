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
  Logger,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto, UpdateOrderDto } from './dto/order.dto';
import { JwtAuthGuard } from 'src/utils/jwt-auth.guard';

@Controller('api/v1/orders')
@UseGuards(JwtAuthGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  logger = new Logger('Order Controller');

  @Get('status-and-quantity')
  async getOrderStatusAndTotalQuantity(@Request() req) {
    return this.orderService.getOrderStatusAndTotalQuantity(req.user.id);
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

  @Get('pending-by-user')
  async findByUser(@Request() req) {
    this.logger.log(`Orders belonging to ${req.user.id}`);
    return this.orderService.findPendingByUser(req.user.id);
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
    this.logger.log(`Updating Order number: ${id}`);
    return this.orderService.update(id, updateOrderDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.orderService.remove(id);
  }
}
