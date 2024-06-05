import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderItemsDto } from 'src/order-item/dto/order-item.dto';
import { Type } from 'class-transformer';

export enum OrderStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}
export class CreateOrderDto {
  @IsString()
  @IsOptional()
  userId: string;

  @IsString()
  @IsNotEmpty()
  storeId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemsDto)
  items: CreateOrderItemsDto[];

  @IsEnum(OrderStatus, {
    message: 'Must have COMPLETED, PENDING or CANCELLED status.',
  })
  @IsOptional()
  status: OrderStatus;
}

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  @IsString()
  @IsOptional()
  id: string;
}
