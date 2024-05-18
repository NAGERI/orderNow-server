// store.dto.ts
export class CreateStoreDto {
  name: string;
  description?: string;
}

export class UpdateStoreDto {
  name?: string;
  description?: string;
}
