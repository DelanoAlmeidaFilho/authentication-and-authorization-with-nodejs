import { Role } from '@prisma/client';

interface IUserResponse {
    name: string;
    email: string;
    roles: Role[];
}

export { IUserResponse };
