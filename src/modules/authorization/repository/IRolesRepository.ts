import { Role } from '@prisma/client';
import { IRoleRequest } from '../dtos/IRoleRequest';

interface IRolesRepository {
    create(data: IRoleRequest): Promise<void>;
    findByName(name: string): Promise<Role>;
    findByIds(roleIds: string[]): Promise<Role[]>;
}

export { IRolesRepository };
