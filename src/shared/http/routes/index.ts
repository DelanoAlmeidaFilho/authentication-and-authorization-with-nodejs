import { Router } from 'express';
import { usersRoutes } from './user.routes';
import { authenticateRoutes } from './authenticate.routes';
import { rolesRoutes } from './role.routes';
import { permissionsRoutes } from './permission.routes';
import { productsRoutes } from './product.routes';

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/roles', rolesRoutes);
routes.use('/permissions', permissionsRoutes);
routes.use('/products', productsRoutes);
routes.use(authenticateRoutes);

export { routes };
