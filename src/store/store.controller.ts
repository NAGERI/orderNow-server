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
  Patch,
} from '@nestjs/common';
import { StoreService } from './store.service';
import { CreateStoreDto, UpdateStoreDto } from './dto/store.dto';
import { JwtAuthGuard } from 'src/utils/jwt-auth.guard';
import { UserRole } from '@prisma/client';
import { Roles } from 'src/utils/roles.decorator';
import { RolesGuard } from 'src/utils/role.guard';

@Controller('api/v1/stores')
@UseGuards(JwtAuthGuard, RolesGuard)
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Post()
  @Roles(UserRole.ADMIN)
  async create(@Body() createStoreDto: CreateStoreDto, @Request() req) {
    return this.storeService.create({
      ...createStoreDto,
      adminId: req.user.id,
    });
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.USER)
  async findAll() {
    return this.storeService.findAll();
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.USER)
  async findOne(@Param('id') id: string) {
    return this.storeService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN)
  async update(
    @Param('id') id: string,
    @Body() updateStoreDto: UpdateStoreDto,
  ) {
    return this.storeService.update(id, updateStoreDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  async remove(@Param('id') id: string) {
    return this.storeService.remove(id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN)
  async deactivateStore(@Param('id') id: String) {
    return this.storeService.deactivateStore(String(id));
  }
}
