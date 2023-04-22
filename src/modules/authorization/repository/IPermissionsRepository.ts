import { Permission } from '@prisma/client';
import { IPermissionRequest } from '../dtos/IPermissionRequest';

interface IPermissionsRepository {
    create(data: IPermissionRequest): Promise<void>;
    findByName(name: string): Promise<Permission>;
    findByIds(permissionIds: string[]): Promise<Permission[]>;
}

export { IPermissionsRepository };
