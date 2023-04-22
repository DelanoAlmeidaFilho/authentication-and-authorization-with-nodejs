import { Decimal } from '@prisma/client/runtime';

interface IProductRequest {
    name: string;
    price: Decimal;
    quantity: number;
}

export { IProductRequest };
