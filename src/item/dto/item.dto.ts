import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export enum ITEMSTATUS {
  InSTOCK = 'InSTOCK',
  OutOfSTOCK = 'OutOfSTOCK',
}
// item.dto.ts
export class CreateItemDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsNotEmpty()
  storeId: number;
}

export class UpdateItemDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  price: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description?: string;

  @IsEnum(ITEMSTATUS, {
    message: 'Must have InSTOCK or OutOfSTOCK status.',
  })
  @IsNotEmpty()
  @IsOptional()
  status: ITEMSTATUS;
}
