import { Router } from 'express';

import async from '../../middlewares/async.middleware';
import loginSchema from '../../validators/login.validator';
import LoginCtrl from '../../controllers/login.controller';
import validate from '../../middlewares/validate.middleware';

const router = Router();

router.post('/', validate(loginSchema), async(LoginCtrl.login));

export default router;
