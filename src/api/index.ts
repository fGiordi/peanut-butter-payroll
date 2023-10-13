import express from 'express';

import MessageResponse from '@/src/interfaces/Responses/MessageResponse';
import emojis from './emojis';
import employees from './employees';

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/emojis', emojis);
router.use('/employees', employees);

export default router;
