import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

import { PartialType } from '@nestjs/mapped-types';

export class CreateItemDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsString()
  @IsNotEmpty()
  storeId: string;
}

export class UpdateItemDto extends PartialType(CreateItemDto) {}
