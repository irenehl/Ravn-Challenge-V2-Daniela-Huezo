import { IPagination } from '@common/interfaces/pagination';
import { PrismaService } from '@config/prisma.service';
import { Injectable } from '@nestjs/common';
import { Order, Prisma } from '@prisma/client';

@Injectable()
export class OrderRepository {
    constructor(private prisma: PrismaService) {}

    async order(
        orderWhereUniqueInput: Prisma.OrderWhereUniqueInput,
    ): Promise<Order | null> {
        return this.prisma.order.findUnique({
            where: orderWhereUniqueInput,
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

    async updateOrder(params: {
        where: Prisma.OrderWhereUniqueInput;
        data: Prisma.OrderUpdateInput;
    }): Promise<Order> {
        const { where, data } = params;
        return this.prisma.order.update({
            data,
            where,
        });
    }

    async deleteOrder(where: Prisma.OrderWhereUniqueInput): Promise<Order> {
        return this.prisma.order.delete({
            where,
        });
    }
}
