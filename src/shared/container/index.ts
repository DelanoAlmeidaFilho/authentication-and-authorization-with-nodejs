import { container } from 'tsyringe';

import { IUsersRepository } from 'modules/secure/repository/IUsersRepository';
import { UsersRepository } from 'modules/secure/repository/implementations/prisma/UsersRepository';
import { IPermissionsRepository } from 'modules/authorization/repository/IPermissionsRepository';
import { PermissionsRepository } from 'modules/authorization/repository/implementations/prisma/PermissionsRepository';
import { IRolesRepository } from 'modules/authorization/repository/IRolesRepository';
import { RolesRepository } from 'modules/authorization/repository/implementations/prisma/RolesRepository';
import { IProductsRepository } from 'modules/products/repository/IProductsRepository';
import { ProductsRepository } from 'modules/products/repository/implementations/prisma/ProductsRepository';

container.registerSingleton<IUsersRepository>(
    'UsersRepository',
    UsersRepository,
);

container.registerSingleton<IPermissionsRepository>(
    'PermissionsRepository',
    PermissionsRepository,
);

container.registerSingleton<IRolesRepository>(
    'RolesRepository',
    RolesRepository,
);

container.registerSingleton<IProductsRepository>(
    'ProductsRepository',
    ProductsRepository,
);
