import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';

export enum ORDERSTATUS {
  Pending = 'Pending',
  Completed = 'Completed',
  Cancelled = 'Cancelled',
}

export class CreateOrderDto {
  @IsNumber()
  @IsNotEmpty()
  itemId: number;
  @IsNumber()
  @IsNotEmpty()
  storeId: number;
  @IsNumber()
  @IsNotEmpty()
  quantity: number;
  @IsNumber()
  @IsNotEmpty()
  totalAmount: number;
}

export class UpdateOrderDto {
  @IsEnum(ORDERSTATUS, {
    message: 'Must have Pending, Completed or Cancelled status.',
  })
  @IsNotEmpty()
  status: ORDERSTATUS;
}
