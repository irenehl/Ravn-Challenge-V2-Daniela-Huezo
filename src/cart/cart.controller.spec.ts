import { Test, TestingModule } from '@nestjs/testing';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { CartRepository } from './cart.repository';
import { ProductService } from '../product/product.service';
import { ProductRepository } from '../product/product.repository';
import { createMockContext, MockContext } from '@config/mock.context';
import { PrismaService } from '@config/prisma.service';

describe('CartController', () => {
    let controller: CartController;
    let mockCtx: MockContext;

    jest.mock('@config/prisma.service', () => ({
        PrismaService: {},
    }));

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [CartController],
            providers: [
                CartService,
                CartRepository,
                ProductService,
                ProductRepository,
                PrismaService,
            ],
        }).compile();

        controller = module.get<CartController>(CartController);
        mockCtx = createMockContext();
    });

    describe('Helpers', () => {
        it('controller should be defined', () => {
            expect(controller).toBeDefined();
        });

        it('prisma should be defined', () => {
            expect(mockCtx.prisma).toBeDefined();
        });
    });

    describe('Get', () => {
        it('should return user cart when id is found', async () => {
            // Arrange
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            mockCtx.prisma.cart.findUnique = jest.fn().mockReturnValueOnce({
                products: [
                    {
                        product: {
                            SKU: 1,
                        },
                        quantity: 1,
                    },
                ],
            });

            // Act
            const result = await controller.getCart({ user: { sub: 1 } });

            // Assert
            expect(result).toHaveProperty('products');
        });
    });

    describe('Post', () => {
        describe('Add product', () => {
            it('should create a product', async () => {
                // cart find unique, product find unique, products on carts create

                // Arrange
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                mockCtx.prisma.cart.findUnique = jest
                    .fn()
                    .mockReturnValueOnce({
                        id: 1,
                        products: [],
                    })
                    .mockReturnValueOnce({
                        products: [
                            {
                                product: {
                                    SKU: 1,
                                },
                                quantity: 1,
                            },
                        ],
                    });

                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                mockCtx.prisma.product.findUnique = jest
                    .fn()
                    .mockReturnValueOnce({
                        SKU: 1,
                        quantity: 2,
                    });

                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                mockCtx.prisma.productsOnOrders.create = jest
                    .fn()
                    .mockReturnValueOnce({
                        quantity: 2,
                        cart: {
                            connect: {
                                id: 2,
                            },
                        },
                        products: {
                            connect: {
                                product: {
                                    SKU: 1,
                                },
                            },
                        },
                    });

                // Act
                const result = await controller.addProduct(
                    { user: { sub: 1 } },
                    { productId: 1, quantity: 1 },
                );

                // Assert
                expect(result).toHaveProperty('products');
                expect(result.products).toHaveLength(1);
            });
        });
    });
});
