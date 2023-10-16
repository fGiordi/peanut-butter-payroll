import express from 'express';

import MessageResponse from '@/src/interfaces/Responses/MessageResponse';
import employees from './employees';

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/employees', employees);

export default router;
