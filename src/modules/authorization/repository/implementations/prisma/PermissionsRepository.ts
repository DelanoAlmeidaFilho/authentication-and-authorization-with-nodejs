import { IPermissionRequest } from 'modules/authorization/dtos/IPermissionRequest';
import { IPermissionsRepository } from '../../IPermissionsRepository';
import { prismaClient } from 'shared/database';
import { Permission } from '@prisma/client';

class PermissionsRepository implements IPermissionsRepository {
    async create(data: IPermissionRequest): Promise<void> {
        await prismaClient.permission.create({
            data,
        });
    }

    async findByName(name: string): Promise<Permission> {
        return await prismaClient.permission.findUnique({
            where: { name },
        });
    }

    async findByIds(permissionIds: string[]): Promise<Permission[]> {
        return await prismaClient.permission.findMany({
            where: {
                id: {
                    in: permissionIds,
                },
            },
        });
    }
}

export { PermissionsRepository };
