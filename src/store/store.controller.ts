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
import { CreateStoreDto, UpdateStoreDto } from './dto/store.dto';
import { JwtAuthGuard } from 'src/utils/jwt-auth.guard';
import { UserRole } from '@prisma/client';
import { Roles } from 'src/utils/roles.decorator';

@Controller('api/v1/stores')
@UseGuards(JwtAuthGuard)
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Get(':ïd')
  async getStoreById(@Param('id') id: number) {
    return this.storeService.getStoreById(Number(id));
  }
  @Get()
  async getStoresByAdminId(@Request() req) {
    return this.storeService.getStores(req.user.id);
  }

  @Get('all')
  async getAllStores() {
    return this.storeService.getAllStores();
  }

  @Post()
  @Roles(UserRole.ADMIN)
  async createStore(@Body() createStoreDto: CreateStoreDto, @Request() req) {
    return this.storeService.createStore({
      adminId: req.user.id,
      ...createStoreDto,
    });
  }

  @Put(':id')
  async updateStore(
    @Param('id') id: number,
    @Body() updateStoreDto: UpdateStoreDto,
  ) {
    return this.storeService.updateStore(Number(id), updateStoreDto);
  }

  @Delete(':id')
  async deleteStore(@Param('id') id: number) {
    return this.storeService.deleteStore(Number(id));
  }
}
