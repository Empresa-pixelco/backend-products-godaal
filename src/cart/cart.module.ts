import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { Cart } from './entities/cart.entity';
import { CartItem } from '../cart-item/entities/cart-item.entity'; // Importa CartItem
import { Order } from '../order/entities/order.entity';
import { Branch } from '../branch/entities/branch.entity';
import { Product } from '../product/entities/product.entity';
import { User } from '../user/entities/user.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([Cart, CartItem, Order, Branch, Product, User]), // Asegúrate de incluir CartItem
  ],
  controllers: [CartController],
  providers: [CartService],
  exports: [CartService],
})
export class CartModule {}
