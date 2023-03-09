import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { FavoritesRepository } from './favorites.repository';
import { PrismaService } from '@config/prisma.service';

@Module({
    providers: [FavoritesService, FavoritesRepository, PrismaService],
    controllers: [FavoritesController],
})
export class FavoritesModule {}
