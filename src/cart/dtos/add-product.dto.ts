import { ApiProperty } from '@nestjs/swagger';

export class AddProductDto {
    @ApiProperty()
    productId: number;

    @ApiProperty()
    quantity: number;
}
