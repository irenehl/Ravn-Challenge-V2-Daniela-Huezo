import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dtos/login.dto';
import bcrypt from 'bcrypt';
import { UserDto } from 'src/user/dtos/user.dto';
import { TokenDto } from './dtos/token.dto';
import { RegisterDto } from './dtos/register.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private configService: ConfigService,
    ) {}

    async validateUser(dto: LoginDto): Promise<UserDto | null> {
        const user = await this.userService.getByEmail(dto.email);

        if (!user || !(await bcrypt.compare(dto.password, user.password)))
            return null;

        return UserDto.toDto(user);
    }

    async login(dto: UserDto): Promise<TokenDto> {
        const payload = { email: dto.email, sub: dto.email, role: dto.role };

        return {
            access_token: this.jwtService.sign(payload, {
                secret: this.configService.get<string>('JWT_SECRET'),
            }),
        };
    }

    async register(dto: RegisterDto): Promise<UserDto> {
        return UserDto.toDto(await this.userService.createUser(dto));
    }
}
