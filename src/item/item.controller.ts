import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { JwtAuthGuard } from 'src/utils/jwt-auth.guard';
import { CreateItemDto, UpdateItemDto } from './dto/item.dto';
import { RolesGuard } from 'src/utils/role.guard';
import { UserRole } from '@prisma/client';

import { Roles } from 'src/utils/roles.decorator';

@Controller('api/v1/items')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get('/by-store/:storeId')
  async getItemsByStore(@Param('storeId') storeId: string) {
    return this.itemService.getItems(String(storeId));
  }
  @Get(':itemId')
  async getOneItem(@Param('itemId') itemId: string) {
    return this.itemService.findOne(String(itemId));
  }
  @Get()
  async getAllItems() {
    return this.itemService.findAll();
  }

  @Post()
  @Roles(UserRole.ADMIN, UserRole.USER)
  async createItem(@Body() createItemDto: CreateItemDto) {
    return this.itemService.createItem(createItemDto);
  }

  @Put(':id')
  async updateItem(
    @Param('id') id: string,
    @Body() updateItemDto: UpdateItemDto,
  ) {
    return this.itemService.updateItem(String(id), updateItemDto);
  }

  @Delete(':id')
  async deleteItem(@Param('id') id: string) {
    return this.itemService.deleteItem(String(id));
  }
}
