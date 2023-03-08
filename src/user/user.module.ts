import { PrismaService } from '@config/prisma.service';
import { Module } from '@nestjs/common';
import { CartRepository } from '@res/cart/cart.repository';
import { CartService } from '@res/cart/cart.service';
import { ProductRepository } from '@res/product/product.repository';
import { ProductService } from '@res/product/product.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
    providers: [
        ProductRepository,
        ProductService,
        CartRepository,
        CartService,
        PrismaService,
        UserService,
        UserRepository,
    ],
    controllers: [UserController],
    exports: [UserService],
})
export class UserModule {}
