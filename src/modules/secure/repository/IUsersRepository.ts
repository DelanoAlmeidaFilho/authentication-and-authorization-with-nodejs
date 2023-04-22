import { Role, User } from '@prisma/client';
import { IUserRequest } from '../dtos/IUserRequest';
import { IUserResponse } from '../dtos/IUserReponse';

interface IUsersRepository {
    create(data: IUserRequest): Promise<void>;
    findById(id: string): Promise<User & { roles: Role[] }>;
    findByEmail(email: string): Promise<User & { roles: Role[] }>;
    list(): Promise<IUserResponse[]>;
}

export { IUsersRepository };
