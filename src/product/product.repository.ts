import { PrismaService } from '@config/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma, Product } from '@prisma/client';

@Injectable()
export class ProductRepository {
    constructor(private prisma: PrismaService) {}

    async createProduct(data: Prisma.ProductCreateInput): Promise<Product> {
        return this.prisma.product.create({
            data,
        });
    }

    async updateProduct(params: {
        where: Prisma.ProductWhereUniqueInput;
        data: Prisma.ProductUpdateInput;
    }): Promise<Product> {
        const { where, data } = params;

        return this.prisma.product.update({
            data,
            where,
        });
    }
}
