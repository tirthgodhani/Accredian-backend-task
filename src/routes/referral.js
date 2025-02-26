import express from 'express';
import { createReferral } from '../controllers/referralController.js';
import { validateReferral } from '../middleware/validation.js';

const router = express.Router();

router.post('/', validateReferral, createReferral);

export default router;
