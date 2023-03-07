import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
    constructor(private userRepository: UserRepository) {}

    async getByEmail(email: string) {
        return this.userRepository.user({ email });
    }

    async createUser(user: Prisma.UserCreateInput): Promise<User> {
        return this.userRepository.createUser(user);
    }
}
