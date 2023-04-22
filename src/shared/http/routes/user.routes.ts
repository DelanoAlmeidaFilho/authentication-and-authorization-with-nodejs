import { Router } from 'express';
import { CreateUserController } from 'modules/secure/useCases/createUser/CreateUserController';
import { ListUsersController } from 'modules/secure/useCases/listUsers/ListUsersController';

const usersRoutes = Router();

const listUsersController = new ListUsersController();
const createUserController = new CreateUserController();

usersRoutes.get('/', listUsersController.handle);
usersRoutes.post('/', createUserController.handle);

export { usersRoutes };
