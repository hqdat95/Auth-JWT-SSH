import { Router } from 'express';

import async from '../../middlewares/async.middleware';
import userSchema from '../../validators/users.validator';
import validate from '../../middlewares/validate.middleware';
import RegisterCtrl from '../../controllers/register.controller';

const router = Router();

router.post('/', validate(userSchema), async(RegisterCtrl.register));

export default router;
