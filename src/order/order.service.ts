import { Injectable } from '@nestjs/common';
import { CartService } from '@res/cart/cart.service';
import { ProductService } from '@res/product/product.service';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrderService {
    constructor(
        private readonly orderRepository: OrderRepository,
        private readonly productService: ProductService,
        private readonly cartService: CartService,
    ) {}

    async placeOrder(userId: number) {
        const cart = await this.cartService.getUserCart(userId);
        const order = await this.orderRepository.createOrder({
            user: {
                connect: {
                    id: userId,
                },
            },
        });

        const products = cart.products.map(({ product, quantity }) =>
            this.orderRepository.addProduct(order.id, product.SKU, quantity),
        );

        const createdProducts = await Promise.all(products);

        await this.orderRepository.updateOrder({
            where: { id: order.id },
            data: {
                products: {
                    connect: createdProducts.map(({ productSKU }) => ({
                        orderId_productSKU: {
                            productSKU,
                            orderId: order.id,
                        },
                    })),
                },
                total: cart.products.reduce(
                    (sum, current) =>
                        sum + current.quantity * current.product.price,
                    0,
                ),
            },
        });

        const stockedProducts = cart.products.map(({ product, quantity }) =>
            this.productService.updateProduct(product.SKU.toString(), {
                stock: product.stock - quantity,
            }),
        );

        await Promise.all(stockedProducts);

        return this.orderRepository.order({ id: order.id });
    }
}
