import { PrismaService } from '@config/prisma.service';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
    providers: [PrismaService, UserService, UserRepository],
    controllers: [UserController],
    exports: [UserService],
})
export class UserModule {}