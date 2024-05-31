import { IsNotEmpty, IsString } from 'class-validator';

export class PaymentDto {
  @IsNotEmpty()
  @IsString()
  orderId: string;
  //TODO   Will include other payment-related fields if necessary (e.g., payment method)
}
