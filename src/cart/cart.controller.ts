import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Req,
    UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from '@res/auth/decorators/role.decorator';
import { JwtAuthGuard } from '@res/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@res/auth/guards/role.guard';
import { CartService } from './cart.service';
import { AddProductDto } from './dtos/add-product.dto';
import { CartExtendedDto } from './dtos/cart-extended.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('CLIENT')
@ApiTags('Cart')
@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) {}

    @Get()
    async getCart(@Req() req): Promise<CartExtendedDto> {
        return this.cartService.getUserCart(req.user.sub);
    }

    @Post('add-product')
    async addProduct(
        @Req() req,
        @Body() data: AddProductDto,
        @Body() dto: AddProductDto,
    ): Promise<CartExtendedDto> {
        return this.cartService.addProduct(req.user.sub, data);
    }

    @Patch('update-product')
    async updateProduct(
        @Req() req,
        @Body() data: AddProductDto,
        @Body() dto: AddProductDto,
    ): Promise<CartExtendedDto> {
        return this.cartService.updateProduct(req.user.sub, data);
    }

    @Delete('delete-product/:id')
    async deleteProduct(
        @Req() req,
        @Param('id') id: string,
    ): Promise<CartExtendedDto> {
        return this.cartService.deleteProduct(req.user.sub, id);
    }
}
