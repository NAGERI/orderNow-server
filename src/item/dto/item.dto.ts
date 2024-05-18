// item.dto.ts
export class CreateItemDto {
  name: string;
  price: number;
  description?: string;
  storeId: number;
}

export class UpdateItemDto {
  name?: string;
  price?: number;
  description?: string;
}
