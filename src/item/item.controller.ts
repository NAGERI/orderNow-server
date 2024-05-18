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

import { CreateItemDto, UpdateItemDto } from './dto/item.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('items')
@UseGuards(AuthGuard())
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get(':storeId')
  async getItems(@Param('storeId') storeId: string) {
    return this.itemService.getItems(Number(storeId));
  }

  @Post()
  async createItem(@Body() createItemDto: CreateItemDto) {
    return this.itemService.createItem(createItemDto);
  }

  @Put(':id')
  async updateItem(
    @Param('id') id: string,
    @Body() updateItemDto: UpdateItemDto,
  ) {
    return this.itemService.updateItem(Number(id), updateItemDto);
  }

  @Delete(':id')
  async deleteItem(@Param('id') id: string) {
    return this.itemService.deleteItem(Number(id));
  }
}
