import { createMockContext, MockContext } from '@config/mock.context';
import { PrismaService } from '@config/prisma.service';
import { Test, TestingModule } from '@nestjs/testing';
import { ProductRepository } from '@res/product/product.repository';
import { ProductService } from '@res/product/product.service';
import { FavoritesController } from './favorites.controller';
import { FavoritesRepository } from './favorites.repository';
import { FavoritesService } from './favorites.service';

describe('FavoritesController', () => {
    let controller: FavoritesController;
    let mockCtx: MockContext;

    jest.mock('@config/prisma.service', () => ({
        PrismaService: {},
    }));

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [FavoritesController],
            providers: [
                FavoritesService,
                FavoritesRepository,
                ProductService,
                ProductRepository,
                PrismaService,
            ],
        }).compile();

        controller = module.get<FavoritesController>(FavoritesController);
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

    describe('Toggle favorites', () => {
        it('should create favorite', async () => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            mockCtx.prisma.favorites.findUnique = jest
                .fn()
                .mockReturnValueOnce({
                    products: [
                        {
                            product: {
                                SKU: 1,
                                available: true,
                                category: 'Cook',
                                description: 'Product 1 desc',
                                image: '',
                                name: 'Product 1',
                                price: 2000,
                                stock: 12,
                            },
                        },
                    ],
                });

            const result = await controller.toggleFavorite(
                { user: { sub: 1 } },
                String(1),
            );

            expect(result).toHaveProperty('products');
        });
    });

    it('should delete favorite', async () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        mockCtx.prisma.favorites.findUnique = jest.fn().mockReturnValueOnce({
            products: [
                {
                    product: {
                        SKU: 1,
                        available: true,
                        category: 'Cook',
                        description: 'Product 1 desc',
                        image: '',
                        name: 'Product 1',
                        price: 2000,
                        stock: 12,
                    },
                },
            ],
        });

        const result = await controller.toggleFavorite(
            { user: { sub: 1 } },
            String(1),
        );

        expect(result).not.toHaveProperty('products');
    });
});
