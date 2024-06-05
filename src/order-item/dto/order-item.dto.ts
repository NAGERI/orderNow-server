import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateOrderItemDto {
  @IsNumber()
  quantity: number;

  @IsString()
  @IsNotEmpty()
  orderId: string;

  @IsString()
  @IsNotEmpty()
  itemId: string;
}

export class UpdateOrderItemDto extends PartialType(CreateOrderItemDto) {
  @IsString()
  @IsOptional()
  id: string;
}

export class CreateOrderItemsDto {
  @IsString()
  @IsNotEmpty()
  itemId: string;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}
