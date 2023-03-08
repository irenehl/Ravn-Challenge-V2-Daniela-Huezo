import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './product/product.module';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';

@Module({
    providers: [AppService],
    imports: [
        AuthModule,
        UserModule,
        ProductModule,
        CartModule,
        OrderModule,
        ConfigModule.forRoot({ isGlobal: true }),
    ],
    controllers: [AppController],
})
export class AppModule {}
