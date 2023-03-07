import { Role, User } from '@prisma/client';

export class UserDto {
    id: number;
    email: string;
    role: Role;
    recovery?: string;

    static toDto(user: User): UserDto {
        return {
            id: user.id,
            email: user.email,
            role: user.role,
            recovery: user.recovery,
        };
    }
}
