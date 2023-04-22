import { Product } from '@prisma/client';
import { IProductRequest } from '../dtos/IProductRequest';
import { IProductResponse } from '../dtos/IProductResponse';

interface IProductsRepository {
    create(data: IProductRequest): Promise<Product>;
    list(): Promise<IProductResponse[]>;
    findByName(name: string): Promise<Product>;
    findById(id: string): Promise<Product>;
}

export { IProductsRepository };
