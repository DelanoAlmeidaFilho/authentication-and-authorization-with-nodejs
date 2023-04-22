import { IUserResponse } from 'modules/secure/dtos/IUserReponse';
import { IUsersRepository } from 'modules/secure/repository/IUsersRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class ListUsersUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}

    async execute(): Promise<IUserResponse[]> {
        return await this.usersRepository.list();
    }
}

export { ListUsersUseCase };
