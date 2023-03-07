import { IPagination } from '@common/interfaces/pagination';
import { PrismaService } from '@config/prisma.service';
import { Injectable } from '@nestjs/common';
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
}
