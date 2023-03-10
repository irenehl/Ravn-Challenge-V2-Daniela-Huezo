import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from '../product/product.service';
import { ProductRepository } from '../product/product.repository';
import { createMockContext, MockContext } from '@config/mock.context';
import { PrismaService } from '@config/prisma.service';
import { ProductController } from './product.controller';
import { CartController } from '@res/cart/cart.controller';

describe('ProducttController', () => {
    let controller: ProductController;
    let mockCtx: MockContext;

    jest.mock('@config/prisma.service', () => ({
        PrismaService: {},
    }));

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [CartController],
            providers: [ProductService, ProductRepository, PrismaService],
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
        it('should return a product when sku is found', async () => {
            // Arrange
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            mockCtx.prisma.product.findUnique = jest.fn().mockReturnValueOnce({
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
            const result = await controller.findOne(String(1));

            // Assert
            expect(result).toHaveProperty('products');
        });
    });

    describe('Post', () => {
        describe('Add product', () => {
            it('should create a product', async () => {
                // Arrange
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                mockCtx.prisma.product.findUnique = jest
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

                const product = {
                    name: 'lorem',
                    description: 'lorem ipsum',
                    stock: 3,
                    image: '',
                    available: true,
                    price: 3400,
                    category: 'medicine',
                };

                // Act
                const result = await controller.create(product);

                // Assert
                expect(result).toHaveProperty('product');
            });
        });
    });
});
