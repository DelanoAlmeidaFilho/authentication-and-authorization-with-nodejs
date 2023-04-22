import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateRoleUseCase } from './CreateRoleUseCase';

class CreateRoleController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { name, description, permissionIds } = req.body;

        const createRoleUseCase = container.resolve(CreateRoleUseCase);

        await createRoleUseCase.execute({ name, description, permissionIds });

        return res.status(201).send();
    }
}

export { CreateRoleController };
