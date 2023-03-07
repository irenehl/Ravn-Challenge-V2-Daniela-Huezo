import { PrismaService } from '@config/prisma.service';
import { Injectable } from '@nestjs/common';
import { Cart, Prisma } from '@prisma/client';

@Injectable()
export class CartRepository {
    constructor(private prisma: PrismaService) {}

    async initCart(data: Prisma.CartCreateInput): Promise<Cart> {
        return this.prisma.cart.create({ data });
    }

    async addProduct(
        cartId: number,
        data: Prisma.ProductsOnCartsCreateInput,
    ): Promise<Cart> {
        await this.prisma.productsOnCarts.create({ data });
        return this.prisma.cart.findUnique({ where: { id: cartId } });
    }
}
