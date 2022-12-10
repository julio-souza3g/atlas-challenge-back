import { Router } from 'express';
import { AuthUserController } from './controllers/auth-user-controller';
import { ListContactsController } from './controllers/list-contacts-controller';

const routes = Router();

const authUserController = new AuthUserController();
const listContactsController = new ListContactsController();

routes.post('/login', authUserController.handle );
routes.get('/list-friends', listContactsController.handle );

export default routes;