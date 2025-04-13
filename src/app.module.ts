import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VeterinaryModule } from './veterinary/veterinary.module';
import { BranchModule } from './branch/branch.module';
import { UserModule } from './user/user.module';
import { CartModule } from './cart/cart.module';
import { CartItemModule } from './cart-item/cart-item.module';
import { OrderModule } from './order/order.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      ssl: {
        rejectUnauthorized: false, // Asegura que el certificado SSL sea aceptado
      },
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
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
