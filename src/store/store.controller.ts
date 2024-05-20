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
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { StoreService } from './store.service';
import { CreateStoreDto, UpdateStoreDto } from './dto/store.dto';
import { JwtAuthGuard } from 'src/utils/jwt-auth.guard';

@Controller('stores')
@UseGuards(JwtAuthGuard)
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Get()
  async getStores(@Request() req) {
    return this.storeService.getStores(req.user.id);
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
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
