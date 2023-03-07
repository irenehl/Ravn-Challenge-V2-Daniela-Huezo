import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { CartService } from '@res/cart/cart.service';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
    constructor(
        private userRepository: UserRepository,
        private cartService: CartService,
    ) {}

    async getByEmail(email: string) {
        return this.userRepository.user({ email });
    }

    async createUser(data: Prisma.UserCreateInput): Promise<User> {
        const user = await this.userRepository.createUser(data);

        if (user.role === 'MANAGER') return user;

        await this.cartService.initCart(user.id);
        return user;
    }
}
