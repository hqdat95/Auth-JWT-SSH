import { Router } from 'express';

import async from '../../middlewares/async.middleware';
import verify from '../../middlewares/verify.middleware';
import LogoutCtrl from '../../controllers/logout.controller';

const router = Router();

router.post('/', verify('ACCESS_TOKEN'), async(LogoutCtrl.logout));

export default router;
