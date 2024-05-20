import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

// item.dto.ts
export class CreateItemDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  description?: string;

  @IsNumber()
  @IsNotEmpty()
  storeId: number;
}

export class UpdateItemDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  description?: string;
}
