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
import { StoreService } from './store.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateStoreDto, UpdateStoreDto } from './dto/store.dto';

@Controller('stores')
@UseGuards(AuthGuard())
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Get()
  async getStores(@Request() req) {
    return this.storeService.getStores(req.user.id);
  }

  @Post()
  async createStore(@Body() createStoreDto: CreateStoreDto, @Request() req) {
    return this.storeService.createStore({
      adminId: req.user.id,
      ...createStoreDto,
    });
  }

  @Put(':id')
  async updateStore(
    @Param('id') id: string,
    @Body() updateStoreDto: UpdateStoreDto,
  ) {
    return this.storeService.updateStore(Number(id), updateStoreDto);
  }

  @Delete(':id')
  async deleteStore(@Param('id') id: string) {
    return this.storeService.deleteStore(Number(id));
  }
}
