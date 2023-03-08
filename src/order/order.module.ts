import { PrismaService } from '@config/prisma.service';
import { Module } from '@nestjs/common';
import { CartRepository } from '@res/cart/cart.repository';
import { CartService } from '@res/cart/cart.service';
import { ProductRepository } from '@res/product/product.repository';
import { ProductService } from '@res/product/product.service';
import { OrderController } from './order.controller';
import { OrderRepository } from './order.repository';
import { OrderService } from './order.service';

@Module({
    providers: [
        OrderService,
        OrderRepository,
        ProductService,
        ProductRepository,
        CartService,
        CartRepository,
        PrismaService,
    ],
    controllers: [OrderController],
})
export class OrderModule {}
