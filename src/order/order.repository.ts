import { IPagination } from '@common/interfaces/pagination';
import { PrismaService } from '@config/prisma.service';
import { Injectable } from '@nestjs/common';
import { Order, Prisma } from '@prisma/client';
import { OrderExtendedDto } from './dtos/order-extended.dto';

@Injectable()
export class OrderRepository {
    constructor(private prisma: PrismaService) {}

    async order(
        orderWhereUniqueInput: Prisma.OrderWhereUniqueInput,
    ): Promise<OrderExtendedDto | null> {
        return this.prisma.order.findUnique({
            where: orderWhereUniqueInput,
            select: {
                id: true,
                total: true,
                orderedAt: true,
                products: {
                    select: {
                        product: true,
                        quantity: true,
                    },
                },
            },
        });
    }

    async orders(
        params: IPagination & {
            cursor?: Prisma.OrderWhereUniqueInput;
            where?: Prisma.OrderWhereInput;
            orderBy?: Prisma.UserOrderByWithAggregationInput;
        },
    ): Promise<Order[]> {
        const { page, limit, cursor, where, orderBy } = params;

        return this.prisma.order.findMany({
            skip: page * limit,
            take: limit,
            cursor,
            where,
            orderBy,
        });
    }

    async createOrder(data: Prisma.OrderCreateInput): Promise<Order> {
        return this.prisma.order.create({
            data,
        });
    }

    async addProduct(orderId: number, productSKU: number, quantity: number) {
        return this.prisma.productsOnOrders.create({
            data: {
                orderId,
                productSKU,
                quantity,
            },
        });
    }

    async updateOrder(params: {
        where: Prisma.OrderWhereUniqueInput;
        data: Prisma.OrderUpdateInput;
    }) {
        const { where, data } = params;
        return this.prisma.order.update({
            where,
            data,
        });
    }
}
