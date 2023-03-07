import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '@config/prisma.service';
import { IPagination } from '@common/interfaces/pagination';
import { env } from 'process';
import bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserRepository {
    constructor(
        private prisma: PrismaService,
        private configService: ConfigService,
    ) {}

    async user(
        userWhereUniqueInput: Prisma.UserWhereUniqueInput,
    ): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: userWhereUniqueInput,
        });
    }

    async users(
        params: IPagination & {
            cursor?: Prisma.UserWhereUniqueInput;
            where?: Prisma.UserWhereInput;
            orderBy?: Prisma.UserOrderByWithRelationInput;
        },
    ): Promise<User[]> {
        const { page, limit, cursor, where, orderBy } = params;

        return this.prisma.user.findMany({
            skip: page * limit,
            take: limit,
            cursor,
            where,
            orderBy,
        });
    }

    async createUser(data: Prisma.UserCreateInput): Promise<User> {
        const salt = await bcrypt.genSalt(
            Number(this.configService.get<string>('SALT')),
        );

        const password = await bcrypt.hash(data.password, salt);

        return this.prisma.user.create({
            data: {
                ...data,
                password,
            },
        });
    }

    async updateUser(params: {
        where: Prisma.UserWhereUniqueInput;
        data: Prisma.UserUpdateInput;
    }): Promise<User> {
        const { where, data } = params;
        return this.prisma.user.update({
            data,
            where,
        });
    }

    async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
        return this.prisma.user.delete({
            where,
        });
    }
}
