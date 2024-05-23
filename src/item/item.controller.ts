import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  ValidationPipe,
  UsePipes,
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

  @Get(':storeId')
  async getItems(@Param('storeId') storeId: string) {
    return this.itemService.getItems(Number(storeId));
  }

  @Post()
  @Roles(UserRole.ADMIN, UserRole.USER)
  async createItem(@Body() createItemDto: CreateItemDto) {
    return this.itemService.createItem(createItemDto);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
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
