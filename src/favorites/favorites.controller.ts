import { Controller, Get, Param, Patch, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from '@res/auth/decorators/role.decorator';
import { JwtAuthGuard } from '@res/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@res/auth/guards/role.guard';
import { FavoritesService } from './favorites.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('CLIENT')
@ApiTags('Favorites')
@Controller('favorites')
export class FavoritesController {
    constructor(private favoritesService: FavoritesService) {}

    @Patch('toggle/:SKU')
    async toggleFavorite(@Req() req, @Param('SKU') sku: string) {
        return this.favoritesService.toggleProduct(req.user.sub, Number(sku));
    }

    @Get()
    async getUserFavorites(@Req() req) {
        return this.favoritesService.favorites(req.user.sub);
    }
}
