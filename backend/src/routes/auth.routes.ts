import { Router } from 'express';
import { login, createAdmin } from '../controllers/auth.controller';

const router = Router();

router.post('/login', login);
router.post('/create-admin', createAdmin); // sirf ek baar use karo

export default router;