import { Request, Response, NextFunction } from 'express';
import { UsersRepository } from 'modules/secure/repository/implementations/prisma/UsersRepository';
import { AppError } from 'shared/error/AppError';
import { container } from 'tsyringe';

export function ensuredPermissions(rolesRoutes: string[]) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const { userId } = req;

        const usersRepository = container.resolve(UsersRepository);

        const user = await usersRepository.findById(userId);

        if (!user) {
            throw new AppError('User not found', 404);
        }

        if (!user.isActive) {
            throw new AppError('User not authorized', 403);
        }

        const roleExists = user.roles
            .map(role => role.name)
            .some(role => rolesRoutes.includes(role));

        if (!roleExists) {
            throw new AppError('User not authorized', 403);
        }

        return next();
    };
}
