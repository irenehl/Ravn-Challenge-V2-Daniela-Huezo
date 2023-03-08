import { PrismaService } from '@config/prisma.service';
import { Injectable } from '@nestjs/common';
import { Cart, Prisma } from '@prisma/client';
import { CartExtendedDto } from './dtos/cart-extended.dto';

@Injectable()
export class CartRepository {
    constructor(private prisma: PrismaService) {}

    async cart(where: Prisma.CartWhereUniqueInput): Promise<CartExtendedDto> {
        return this.prisma.cart.findUnique({
            where,
            select: {
                id: true,
                userId: true,
                products: {
                    select: {
                        product: true,
                        quantity: true,
                    },
                },
            },
        });
    }

    async initCart(data: Prisma.CartCreateInput): Promise<Cart> {
        return this.prisma.cart.create({ data });
    }

    async addProduct(
        cartId: number,
        data: Prisma.ProductsOnCartsCreateInput,
    ): Promise<CartExtendedDto> {
        await this.prisma.productsOnCarts.create({ data });

        return this.cart({ id: cartId });
    }

    async updateCart(
        cartId: number,
        productId: number,
        data: Prisma.ProductsOnCartsUpdateInput,
    ): Promise<CartExtendedDto> {
        await this.prisma.productsOnCarts.update({
            where: {
                cartId_productSKU: { cartId: cartId, productSKU: productId },
            },
            data,
        });

        return this.cart({ id: cartId });
    }

    async deleteProduct(
        cartId: number,
        productId: number,
    ): Promise<CartExtendedDto> {
        await this.prisma.productsOnCarts.delete({
            where: {
                cartId_productSKU: { cartId: cartId, productSKU: productId },
            },
        });

        return this.cart({ id: cartId });
    }
}
