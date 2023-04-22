import { Role, User } from '@prisma/client';
import { IUserRequest } from 'modules/secure/dtos/IUserRequest';
import { IUsersRepository } from '../../IUsersRepository';
import { prismaClient } from 'shared/database';
import { IUserResponse } from 'modules/secure/dtos/IUserReponse';

class UsersRepository implements IUsersRepository {
    async create({
        name,
        email,
        password,
        roles,
    }: IUserRequest): Promise<void> {
        await prismaClient.user.create({
            data: {
                name,
                email,
                password,
                roles: {
                    connect: roles.map(role => ({ id: role.id })),
                },
            },
        });
    }

    async findById(id: string): Promise<User & { roles: Role[] }> {
        return await prismaClient.user.findUnique({
            where: { id },
            include: {
                roles: true,
            },
        });
    }

    async findByEmail(email: string): Promise<User & { roles: Role[] }> {
        return await prismaClient.user.findUnique({
            where: { email },
            include: { roles: true },
        });
    }

    async list(): Promise<IUserResponse[]> {
        const users = await prismaClient.user.findMany({
            include: {
                roles: true,
            },
        });

        return users.map(user => ({
            name: user.name,
            email: user.email,
            roles: user.roles,
        }));
    }
}

export { UsersRepository };
