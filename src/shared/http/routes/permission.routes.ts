import { Router } from 'express';
import { CreatePermissionController } from 'modules/authorization/useCases/CreatePermission/CreatePermissionController';

const permissionsRoutes = Router();

const createPermissionController = new CreatePermissionController();

permissionsRoutes.post('/', createPermissionController.handle);

export { permissionsRoutes };
