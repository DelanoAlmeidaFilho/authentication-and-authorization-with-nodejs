import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateUserUseCase } from './CreateUserUseCase';

class CreateUserController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { email, password, name, roleIds } = req.body;

        const createUserUseCase = container.resolve(CreateUserUseCase);

        await createUserUseCase.execute({ email, password, name, roleIds });

        return res.status(201).send();
    }
}

export { CreateUserController };
