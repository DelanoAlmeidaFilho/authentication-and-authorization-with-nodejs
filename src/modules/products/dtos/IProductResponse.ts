import { Decimal } from '@prisma/client/runtime';

interface IProductResponse {
    id: string;
    name: string;
    price: Decimal;
    quantity: number;
}

export { IProductResponse };
