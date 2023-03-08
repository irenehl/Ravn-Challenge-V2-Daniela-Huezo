import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    stock: number;

    @ApiProperty()
    image?: string | null;

    @ApiProperty()
    available?: boolean;

    @ApiProperty()
    price: number;

    @ApiProperty()
    category?: string;
}
