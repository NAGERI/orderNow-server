import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export enum STORESTATUS {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

// store.dto.ts
export class CreateStoreDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description?: string;

  @IsEnum(STORESTATUS, {
    message: 'Must have ACTIVE or INACTIVE status.',
  })
  status?: STORESTATUS;
}

export class UpdateStoreDto extends PartialType(CreateStoreDto) {}
