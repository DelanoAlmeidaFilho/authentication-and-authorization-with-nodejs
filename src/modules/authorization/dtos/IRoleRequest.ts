import { Permission } from '@prisma/client';

interface IRoleRequest {
    name: string;
    description?: string;
    permissions: Permission[];
}

export { IRoleRequest };
