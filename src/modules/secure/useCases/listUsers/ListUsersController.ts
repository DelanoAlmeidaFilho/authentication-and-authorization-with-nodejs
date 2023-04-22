import { container } from 'tsyringe';
import { ListUsersUseCase } from './ListUsersUseCase';
import { Request, Response } from 'express';

class ListUsersController {
    async handle(req: Request, res: Response) {
        const listUsersUseCase = container.resolve(ListUsersUseCase);

        const users = await listUsersUseCase.execute();

        return res.json(users);
    }
}
export { ListUsersController };
