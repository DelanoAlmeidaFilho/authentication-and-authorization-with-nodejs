import { Router } from 'express';
import { CreateRoleController } from 'modules/authorization/useCases/createRole/CreateRoleController';

const rolesRoutes = Router();

const createRoleController = new CreateRoleController();

rolesRoutes.post('/', createRoleController.handle);

export { rolesRoutes };
