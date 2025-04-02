import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { AppController } from './app.controller';  // Importar AppController
import { AppService } from './app.service';  // Importar AppService
import { VeterinaryModule } from './veterinary/veterinary.module';
import { BranchModule } from './branch/branch.module';
import { UserModule } from './user/user.module';
import { CartModule } from './cart/cart.module';
import { CartItemModule } from './cart-item/cart-item.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true, 
    }),
    CategoryModule,
    ProductModule,
    VeterinaryModule,
    BranchModule,
    UserModule,
    CartModule,
    CartItemModule,
    OrderModule,
  ],
  controllers: [AppController], 
  providers: [AppService],
})
export class AppModule {}
