import { Router } from 'express';

import async from '../../middlewares/async.middleware';
import verify from '../../middlewares/verify.middleware';
import HomeCtrl from '../../controllers/home.controller';

const router = Router();

router.get('/', verify('ACCESS_TOKEN'), async(HomeCtrl.home));

export default router;
