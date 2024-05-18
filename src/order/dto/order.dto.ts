export enum ORDERSTATUS {
  Pending = 'Pending',
  Completed = 'Completed',
  Cancelled = 'Cancelled',
}

export class CreateOrderDto {
  itemId: number;
  storeId: number;
  quantity: number;
  totalAmount: number;
}

export class UpdateOrderDto {
  status: ORDERSTATUS;
}
