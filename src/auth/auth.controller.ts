import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { UserDto } from '@res/user/dtos/user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';
import { TokenDto } from './dtos/token.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(
        @Request() req: LoginDto & { user: UserDto },
    ): Promise<TokenDto> {
        return this.authService.login(req.user);
    }

    @Post('register')
    async register(@Body() req: RegisterDto): Promise<UserDto> {
        return this.authService.register(req);
    }
}
