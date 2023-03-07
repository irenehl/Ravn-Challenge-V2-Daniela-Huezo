import { Prisma } from '@prisma/client';

export type RegisterDto = Omit<Prisma.UserCreateInput, 'role'>;
