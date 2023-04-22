import { hash } from 'bcryptjs';
import { RolesRepository } from 'modules/authorization/repository/implementations/prisma/RolesRepository';
import { IUserRequest } from 'modules/secure/dtos/IUserRequest';
import { IUsersRepository } from 'modules/secure/repository/IUsersRepository';
import { AppError } from 'shared/error/AppError';
import { inject, injectable } from 'tsyringe';

interface IRequest {
    name: string;
    email: string;
    password: string;
    roleIds: string[];
}

@injectable()
class CreateUserUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject('RolesRepository')
        private rolesRepository: RolesRepository,
    ) {}

    async execute({ name, email, password, roleIds }: IRequest): Promise<void> {
        const userExists = await this.usersRepository.findByEmail(email);

        if (userExists) {
            throw new AppError('User already exists');
        }

        const roles = await this.rolesRepository.findByIds(roleIds);

        const passwordhash = await hash(password, 8);

        await this.usersRepository.create({
            email,
            password: passwordhash,
            name,
            roles,
        });
    }
}

export { CreateUserUseCase };
