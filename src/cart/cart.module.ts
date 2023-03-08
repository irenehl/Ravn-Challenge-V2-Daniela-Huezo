import { PrismaService } from '@config/prisma.service';
import { Module } from '@nestjs/common';
import { ProductModule } from '@res/product/product.module';
import { ProductRepository } from '@res/product/product.repository';
import { ProductService } from '@res/product/product.service';
import { UserRepository } from '@res/user/user.repository';
import { CartController } from './cart.controller';
import { CartRepository } from './cart.repository';
import { CartService } from './cart.service';

@Module({
    imports: [ProductModule],
    controllers: [CartController],
    providers: [
        UserRepository,
        ProductRepository,
        ProductService,
        PrismaService,
        ProductService,
        CartService,
        CartRepository,
    ],
    exports: [CartService, CartRepository],
})
export class CartModule {}
