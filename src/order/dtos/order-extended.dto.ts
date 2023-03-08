import { Order, Product } from '@prisma/client';

export type OrderExtendedDto = Omit<Order, 'userId'> & {
    products: {
        product: Product;
        quantity: number;
    }[];
};
