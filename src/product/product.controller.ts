import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { Product as ProductDto } from '@prisma/client';
import { Roles } from '@res/auth/decorators/role.decorator';
import { JwtAuthGuard } from '@res/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@res/auth/guards/role.guard';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductService } from './product.service';

@UseGuards(JwtAuthGuard)
@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Post('create')
    @Roles('MANAGER')
    @UseGuards(RolesGuard)
    async create(@Body() data: CreateProductDto): Promise<ProductDto> {
        return this.productService.createProduct(data);
    }

    @Post('update/:sku')
    @Roles('MANAGER')
    @UseGuards(RolesGuard)
    async update(
        @Param('sku') sku: string,
        @Body() data: UpdateProductDto,
    ): Promise<ProductDto> {
        return this.productService.updateProduct(sku, data);
    }
}
