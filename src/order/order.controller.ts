import { Body, Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import { Roles } from '@res/auth/decorators/role.decorator';
import { JwtAuthGuard } from '@res/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@res/auth/guards/role.guard';
import { OrderService } from './order.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Roles('CLIENT')
    @Post('pay')
    async placeOrder(@Req() req) {
        return this.orderService.placeOrder(req.user.sub);
    }
}
