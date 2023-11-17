import { Router } from 'express';

import LoginRouter from './login.routes';
import TokenRouter from './token.routes';
import LogoutRouter from './logout.routes';
import RegisterRouter from './register.routes';

const router = Router();

router.use('/login', LoginRouter);

router.use('/token', TokenRouter);

router.use('/logout', LogoutRouter);

router.use('/register', RegisterRouter);

export default router;
