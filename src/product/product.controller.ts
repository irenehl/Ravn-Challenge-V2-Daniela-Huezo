import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Product as ProductDto } from '@prisma/client';
import { Roles } from '@res/auth/decorators/role.decorator';
import { JwtAuthGuard } from '@res/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@res/auth/guards/role.guard';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { ProductService } from './product.service';

@UseGuards(JwtAuthGuard)
@ApiTags('Product')
@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get('all')
    async findAll(
        @Query('page') page: string,
        @Query('limit') limit: string,
    ): Promise<ProductDto[]> {
        return this.productService.getAllProducts(Number(page), Number(limit));
    }

    @Get(':sku')
    async findOne(@Param('sku') sku: string): Promise<ProductDto | void> {
        return this.productService.getOne(sku);
    }

    @Post('create')
    @Roles('MANAGER')
    @UseGuards(RolesGuard)
    async create(
        @Body() data: CreateProductDto,
        @Body() dto: CreateProductDto,
    ): Promise<ProductDto> {
        return this.productService.createProduct(data);
    }

    @Patch('update/:sku')
    @Roles('MANAGER')
    @UseGuards(RolesGuard)
    async update(
        @Param('sku') sku: string,
        @Body() data: UpdateProductDto,
    ): Promise<ProductDto> {
        return this.productService.updateProduct(sku, data);
    }

    @Patch('toggle/:sku')
    @Roles('MANAGER')
    @UseGuards(RolesGuard)
    async disable(@Param('sku') sku: string): Promise<ProductDto> {
        return this.productService.toggleProduct(sku);
    }

    @Delete('delete/:sku')
    @Roles('MANAGER')
    @UseGuards(RolesGuard)
    async delete(@Param('sku') sku: string): Promise<ProductDto> {
        return this.productService.deleteProduct(sku);
    }
}
