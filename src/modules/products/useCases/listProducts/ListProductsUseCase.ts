import { IProductResponse } from 'modules/products/dtos/IProductResponse';
import { IProductsRepository } from 'modules/products/repository/IProductsRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class ListProductsUseCase {
    constructor(
        @inject('ProductsRepository')
        private productsRepository: IProductsRepository,
    ) {}

    async execute(): Promise<IProductResponse[]> {
        return await this.productsRepository.list();
    }
}

export { ListProductsUseCase };
