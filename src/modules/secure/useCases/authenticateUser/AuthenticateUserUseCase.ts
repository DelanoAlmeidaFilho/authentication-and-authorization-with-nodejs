import { inject, injectable } from 'tsyringe';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import { IAuthenticateRequest } from 'modules/secure/dtos/IAuthenticateRequest';
import { IAuthenticateResponse } from 'modules/secure/dtos/IAuthenticateResponse';
import { IUsersRepository } from 'modules/secure/repository/IUsersRepository';
import { AppError } from 'shared/error/AppError';

@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}

    async execute({
        email,
        password,
    }: IAuthenticateRequest): Promise<IAuthenticateResponse> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError('Email or password incorrect!');
        }

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new AppError('Email or password incorrect!');
        }

        const roles = user.roles.map(role => role.name);

        const token = sign({ roles }, process.env.SECRET_TOKEN, {
            subject: user.id,
            expiresIn: '1d',
        });

        return {
            user: {
                email: user.email,
                name: user.name,
            },
            token,
        };
    }
}

export { AuthenticateUserUseCase };
