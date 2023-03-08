import { IPagination } from '@common/interfaces/pagination';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Product } from '@prisma/client';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
    constructor(private productRepository: ProductRepository) {}

    async createProduct(data: Prisma.ProductCreateInput) {
        return this.productRepository.createProduct(data);
    }

    async updateProduct(sku: string, data: Prisma.ProductUpdateInput) {
        return this.productRepository.updateProduct({
            where: { SKU: +sku },
            data,
        });
    }

    async toggleProduct(sku: string) {
        const product = await this.productRepository.product({ SKU: +sku });

        return this.productRepository.updateProduct({
            where: { SKU: +sku },
            data: {
                available: !product.available,
            },
        });
    }

    async deleteProduct(sku: string): Promise<Product> {
        return this.productRepository.deleteProduct({ SKU: +sku });
    }

    async getOne(sku: string): Promise<Product | null> {
        const product = await this.productRepository.product({ SKU: +sku });

        if (!product) throw new NotFoundException('Product not found');

        return product;
    }

    async getAllProducts(page: number, limit: number) {
        return this.productRepository.products({
            page: page,
            limit: limit,
        });
    }

    async getByCategory(
        params: { category: string } & IPagination,
    ): Promise<Product[]> {
        const { category, page, limit } = params;

        return this.productRepository.products({
            where: {
                category: {
                    search: category,
                },
            },
            page,
            limit,
        });
    }
}
