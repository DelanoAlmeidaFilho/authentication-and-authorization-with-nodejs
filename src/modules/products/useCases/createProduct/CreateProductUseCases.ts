import { Product } from '@prisma/client';
import { IProductRequest } from 'modules/products/dtos/IProductRequest';
import { IProductsRepository } from 'modules/products/repository/IProductsRepository';
import { AppError } from 'shared/error/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
class CreateProductUseCases {
    constructor(
        @inject('ProductsRepository')
        private productsRepository: IProductsRepository,
    ) {}

    async execute({
        name,
        price,
        quantity,
    }: IProductRequest): Promise<Product> {
        const productExists = await this.productsRepository.findByName(name);

        if (productExists) {
            throw new AppError('Product already exists');
        }

        return await this.productsRepository.create({ name, price, quantity });
    }
}

export { CreateProductUseCases };
