import { BadRequestException, Injectable } from '@nestjs/common';
import { Cart } from '@prisma/client';
import { ProductService } from '@res/product/product.service';
import { CartRepository } from './cart.repository';
import { AddProductDto } from './dtos/add-product.dto';
import { CartExtendedDto } from './dtos/cart-extended.dto';

@Injectable()
export class CartService {
    constructor(
        private cartRepository: CartRepository,
        private productService: ProductService,
    ) {}

    async initCart(userId: number): Promise<Cart> {
        return this.cartRepository.initCart({
            user: {
                connect: {
                    id: userId,
                },
            },
        });
    }

    async getCart(cartId: number): Promise<CartExtendedDto> {
        return this.cartRepository.cart({ id: cartId });
    }

    async getUserCart(userId: number): Promise<CartExtendedDto> {
        return this.cartRepository.cart({ userId });
    }

    async addProduct(
        userId: number,
        data: AddProductDto,
    ): Promise<CartExtendedDto> {
        const { productId, quantity } = data;

        const cart = await this.getUserCart(userId);
        const product = await this.productService.getOne(productId.toString());

        if (product.stock < quantity)
            throw new BadRequestException('Quantity exceeds current stock');

        return this.cartRepository.addProduct(cart.id, {
            cart: {
                connect: {
                    id: cart.id,
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

    async updateProduct(
        userId: number,
        data: AddProductDto,
    ): Promise<CartExtendedDto> {
        const { productId, quantity } = data;

        const cart = await this.getUserCart(userId);
        const product = await this.productService.getOne(productId.toString());

        if (product.stock < quantity)
            throw new BadRequestException('Quantity exceeds current stock');

        if (quantity <= 0)
            throw new BadRequestException(
                'Quantity cannot be less or equal than zero',
            );

        return this.cartRepository.updateCart(cart.id, product.SKU, {
            cart: {
                connect: {
                    id: cart.id,
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

    async deleteProduct(
        userId: number,
        productId: string,
    ): Promise<CartExtendedDto> {
        const cart = await this.getUserCart(userId);

        return this.cartRepository.deleteProduct(cart.id, Number(productId));
    }
}
