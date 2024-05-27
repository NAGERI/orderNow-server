import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { OrderItemService } from './order-item.service';
import { CreateOrderItemDto, UpdateOrderItemDto } from './dto/order-item.dto';
import { JwtAuthGuard } from 'src/utils/jwt-auth.guard';

@Controller('api/v1/order-items')
@UseGuards(JwtAuthGuard)
export class OrderItemController {
  constructor(private readonly orderItemService: OrderItemService) {}

  @Post()
  async create(@Body() createOrderItemDto: CreateOrderItemDto) {
    return this.orderItemService.create(createOrderItemDto);
  }

  @Get()
  async findAll() {
    return this.orderItemService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.orderItemService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateOrderItemDto: UpdateOrderItemDto,
  ) {
    return this.orderItemService.update(id, updateOrderItemDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.orderItemService.remove(id);
  }
}
