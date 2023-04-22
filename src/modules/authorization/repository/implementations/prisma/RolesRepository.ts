import { Role } from '@prisma/client';
import { IRoleRequest } from 'modules/authorization/dtos/IRoleRequest';
import { IRolesRepository } from '../../IRolesRepository';
import { prismaClient } from 'shared/database';

class RolesRepository implements IRolesRepository {
    async create({
        name,
        description,
        permissions,
    }: IRoleRequest): Promise<void> {
        await prismaClient.role.create({
            data: {
                name,
                description,
                permissions: {
                    connect: permissions.map(permission => ({
                        id: permission.id,
                    })),
                },
            },
        });
    }

    async findByName(name: string): Promise<Role> {
        return await prismaClient.role.findUnique({
            where: { name },
        });
    }

    async findByIds(roleIds: string[]): Promise<Role[]> {
        return await prismaClient.role.findMany({
            where: {
                id: {
                    in: roleIds,
                },
            },
        });
    }
}

export { RolesRepository };
