import { Product } from '@prisma/client';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateProductUseCases } from './CreateProductUseCases';

class CreateProductController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { name, price, quantity } = req.body;

        const createProductUseCases = container.resolve(CreateProductUseCases);

        const product = await createProductUseCases.execute({
            name,
            price,
            quantity,
        });

        return res.status(201).json(product);
    }
}

export { CreateProductController };
