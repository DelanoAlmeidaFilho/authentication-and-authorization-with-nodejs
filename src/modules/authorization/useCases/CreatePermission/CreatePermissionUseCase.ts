import { IPermissionRequest } from 'modules/authorization/dtos/IPermissionRequest';
import { IPermissionsRepository } from 'modules/authorization/repository/IPermissionsRepository';
import { AppError } from 'shared/error/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
class CreatePermissionUseCase {
    constructor(
        @inject('PermissionsRepository')
        private permissionsRepository: IPermissionsRepository,
    ) {}

    async execute({ name, description }: IPermissionRequest): Promise<void> {
        const permissionExists = await this.permissionsRepository.findByName(
            name,
        );

        if (permissionExists) {
            throw new AppError('permission already exists');
        }

        await this.permissionsRepository.create({ name, description });
    }
}

export { CreatePermissionUseCase };
