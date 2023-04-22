import { Router } from 'express';
import { CreateProductController } from 'modules/products/useCases/createProduct/CreateProductController';
import { ListProductsController } from 'modules/products/useCases/listProducts/ListProductsController';
import { ensuredAuthenticated } from '../middlewares/ensuredAuthenticated';
import { ensuredPermissions } from '../middlewares/ensuredPermissions';

const productsRoutes = Router();

const listProductsController = new ListProductsController();
const createProductController = new CreateProductController();

productsRoutes.get('/', listProductsController.handle);
productsRoutes.post(
    '/',
    ensuredAuthenticated(),
    ensuredPermissions(['ROLE_ADMIN']),
    createProductController.handle,
);

export { productsRoutes };
