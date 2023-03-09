import { ApiProperty } from '@nestjs/swagger';
import { Product } from '@prisma/client';

export class ProductFavoritesDto {
    @ApiProperty()
    product: Product;
}
