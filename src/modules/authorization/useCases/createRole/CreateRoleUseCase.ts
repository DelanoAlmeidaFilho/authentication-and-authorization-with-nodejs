import { IRoleRequest } from 'modules/authorization/dtos/IRoleRequest';
import { IPermissionsRepository } from 'modules/authorization/repository/IPermissionsRepository';
import { RolesRepository } from 'modules/authorization/repository/implementations/prisma/RolesRepository';
import { AppError } from 'shared/error/AppError';
import { inject, injectable } from 'tsyringe';

interface IRequest {
    name: string;
    description: string;
    permissionIds: string[];
}

@injectable()
class CreateRoleUseCase {
    constructor(
        @inject('RolesRepository')
        private rolesRepository: RolesRepository,
        @inject('PermissionsRepository')
        private permissionsRepository: IPermissionsRepository,
    ) {}

    async execute({
        name,
        description,
        permissionIds,
    }: IRequest): Promise<void> {
        const roleExists = await this.rolesRepository.findByName(name);

        if (roleExists) {
            throw new AppError('role already exists');
        }

        const permissions = await this.permissionsRepository.findByIds(
            permissionIds,
        );

        await this.rolesRepository.create({
            name,
            description,
            permissions,
        });
    }
}

export { CreateRoleUseCase };
