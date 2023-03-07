import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UserRepository } from 'src/user/user.repository';
import { CreateOrderDto } from './dtos/create-order.dto';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrderService {
    constructor(
        private readonly orderRepository: OrderRepository,
        private readonly userRepository: UserRepository,
    ) {}

    async placeOrder(data: CreateOrderDto) {
        const createOrder = this.orderRepository.createOrder({
            user: {
                connect: {
                    id: data.user,
                },
            },
        });

        // const setProducts = this.orderRepository.updateOrder({
        //     where: { orderId: createOrder.id }
        // })
    }
}
