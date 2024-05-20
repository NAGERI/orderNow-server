import { IsNotEmpty, IsString } from 'class-validator';

// store.dto.ts
export class CreateStoreDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsString()
  description?: string;
}

export class UpdateStoreDto {
  @IsString()
  name?: string;
  @IsString()
  description?: string;
}
