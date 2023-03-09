import { Injectable } from '@nestjs/common';
import { FavoritesRepository } from './favorites.repository';

@Injectable()
export class FavoritesService {
    constructor(private favoritesRepository: FavoritesRepository) {}

    async toggleProduct(userId: number, SKU: number) {
        await this.favoritesRepository.togglefavorite(
            {
                userId_productSKU: {
                    userId,
                    productSKU: SKU,
                },
            },
            {
                user: {
                    connect: { id: userId },
                },
                product: {
                    connect: { SKU },
                },
            },
        );

        return this.favoritesRepository.favorites(userId);
    }

    async favorites(userId: number) {
        return this.favoritesRepository.favorites(userId);
    }
}
