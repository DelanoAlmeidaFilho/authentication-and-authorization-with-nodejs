import { Product } from '@prisma/client';
import { IProductRequest } from 'modules/products/dtos/IProductRequest';
import { IProductResponse } from 'modules/products/dtos/IProductResponse';
import { IProductsRepository } from '../../IProductsRepository';
import { prismaClient } from 'shared/database';

class ProductsRepository implements IProductsRepository {
    async create(data: IProductRequest): Promise<Product> {
        return await prismaClient.product.create({ data });
    }

    async list(): Promise<IProductResponse[]> {
        const products = await prismaClient.product.findMany();

        return products.map(product => ({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: product.quantity,
        }));
    }

    async findByName(name: string): Promise<Product> {
        return await prismaClient.product.findUnique({
            where: { name },
        });
    }

    async findById(id: string): Promise<Product> {
        return await prismaClient.product.findUnique({
            where: { id },
        });
    }
}

export { ProductsRepository };
