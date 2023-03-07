import { Body, Controller, Param, Post } from '@nestjs/common';
import { CreateOrderDto } from './dtos/create-order.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Post('user/:id')
    async placeOrder(
        @Param('id') id: string,
        @Body() orderInfo: CreateOrderDto,
    ) {
        return this.orderService.placeOrder({
            ...orderInfo,
            user: Number(id),
        });
    }
}
