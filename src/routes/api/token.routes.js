import { Router } from 'express';

import async from '../../middlewares/async.middleware';
import verify from '../../middlewares/verify.middleware';
import tokenCtrl from '../../controllers/token.controller';

const router = Router();

router.post('/refresh', verify('REFRESH_TOKEN'), async(tokenCtrl.refreshToken));

export default router;
