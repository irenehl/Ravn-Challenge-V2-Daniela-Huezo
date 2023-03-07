import { IPagination } from '@common/interfaces/pagination';
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

    async deleteProduct(
        where: Prisma.ProductWhereUniqueInput,
    ): Promise<Product> {
        return this.prisma.product.delete({
            where,
        });
    }

    async product(
        productWhereUniqueInput: Prisma.ProductWhereUniqueInput,
    ): Promise<Product | null> {
        return this.prisma.product.findUnique({
            where: productWhereUniqueInput,
        });
    }

    async products(
        params: IPagination & {
            cursor?: Prisma.ProductWhereUniqueInput;
            where?: Prisma.ProductWhereInput;
            orderBy?: Prisma.ProductOrderByWithAggregationInput;
        },
    ): Promise<Product[]> {
        const { page, limit, cursor, where, orderBy } = params;

        return this.prisma.product.findMany({
            skip: (page - 1) * limit,
            take: limit,
            cursor,
            where,
            orderBy,
        });
    }
}
