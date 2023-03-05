import { IPagination } from '@common/interfaces/pagination';
import { PrismaService } from '@config/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma, Product } from '@prisma/client';

@Injectable()
export class ProductService {
    constructor(private prisma: PrismaService) {}

    async product(
        ProductWhereUniqueInput: Prisma.UserWhereUniqueInput,
    ): 

    async products(
        params: IPagination & {
            cursor?: Prisma.ProductWhereUniqueInput;
            where?: Prisma.ProductWhereInput;
            orderBy?: Prisma.ProductOrderByWithRelationInput;
        },
    ): Promise<Product[]> {
        const { page, limit, cursor, where, orderBy } = params;

        return this.prisma.product.findMany({
            skip: page * limit,
            take: limit,
            cursor,
            where,
            orderBy,
        });
    }
}
