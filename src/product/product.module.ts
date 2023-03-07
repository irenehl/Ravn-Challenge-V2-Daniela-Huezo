import { PrismaService } from '@config/prisma.service';
import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductRepository } from './product.repository';
import { ProductService } from './product.service';

@Module({
    imports: [],
    controllers: [ProductController],
    providers: [PrismaService, ProductRepository, ProductService],
})
export class ProductModule {}
