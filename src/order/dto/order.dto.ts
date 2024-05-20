import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export enum ORDERSTATUS {
  Pending = 'Pending',
  Completed = 'Completed',
  Cancelled = 'Cancelled',
}

export class CreateOrderDto {
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  itemId: number;

  @IsNumber()
  @IsNotEmpty()
  storeId: number;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  totalAmount?: number;
}

export class UpdateOrderDto {
  @IsEnum(ORDERSTATUS, {
    message: 'Must have Pending, Completed or Cancelled status.',
  })
  @IsNotEmpty()
  status: ORDERSTATUS;
}
