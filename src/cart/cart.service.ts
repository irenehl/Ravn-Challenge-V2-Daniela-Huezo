import { Injectable } from '@nestjs/common';
import { Cart } from '@prisma/client';
import { CartRepository } from './cart.repository';

@Injectable()
export class CartService {
    constructor(private cartRepository: CartRepository) {}

    async initCart(userId: number): Promise<Cart> {
        return this.cartRepository.initCart({
            user: {
                connect: {
                    id: userId,
                },
            },
        });
    }

    async addProduct(
        cartId: number,
        productId: number,
        quantity: number,
    ): Promise<Cart> {
        return this.cartRepository.addProduct(cartId, {
            cart: {
                connect: {
                    id: cartId,
                },
            },
            product: {
                connect: {
                    SKU: productId,
                },
            },
            quantity,
        });
    }
}
