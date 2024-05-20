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
}

export class UpdateStoreDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description?: string;
  @IsOptional()
  @IsEnum(STORESTATUS, {
    message: 'Must have ACTIVE or INACTIVE status.',
  })
  status?: STORESTATUS;
}
