import { Role } from '@prisma/client';

interface IUserRequest {
    name: string;
    email: string;
    password: string;
    roles: Role[];
}

export { IUserRequest };
