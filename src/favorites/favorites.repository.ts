import { PrismaService } from '@config/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ProductFavoritesDto } from './dtos/product-favorites.dto';

@Injectable()
export class FavoritesRepository {
    constructor(private prisma: PrismaService) {}

    async favorites(userId: number): Promise<ProductFavoritesDto[]> {
        return this.prisma.favorites.findMany({
            select: {
                product: true,
                user: false,
            },
            where: {
                userId,
            },
        });
    }

    async togglefavorite(
        where: Prisma.FavoritesWhereUniqueInput,
        data: Prisma.FavoritesCreateInput,
    ): Promise<ProductFavoritesDto> {
        const isFavorite = await this.prisma.favorites.findUnique({
            where,
        });

        return isFavorite
            ? await this.prisma.favorites.delete({
                  where,
                  select: {
                      product: true,
                      user: false,
                  },
              })
            : await this.prisma.favorites.create({
                  data,
                  select: {
                      product: true,
                      user: false,
                  },
              });
    }
}
