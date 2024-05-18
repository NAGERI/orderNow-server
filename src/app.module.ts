import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { StoreModule } from './store/store.module';
import { ItemModule } from './item/item.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [AuthModule, UserModule, StoreModule, ItemModule, OrderModule],
  providers: [],
})
export class AppModule {}
