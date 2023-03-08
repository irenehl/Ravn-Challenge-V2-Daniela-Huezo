import { Cart, Product } from '@prisma/client';

export type CartExtendedDto = Cart & {
    products: {
        product: Product;
        quantity: number;
    }[];
};
