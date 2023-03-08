import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

export class RegisterDto {
    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;
}
