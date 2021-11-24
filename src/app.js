import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import connection from './database/database.js';

import * as userController from './controllers/userController.js';
import * as financialEventController from './controllers/financialEventController.js';
import verifyToken from './middleware/userMiddleware.js';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/sign-up', userController.signUp);

app.post('/sign-in', userController.signIn);

app.post('/financial-events', financialEventController.postFinancialEventsSum);

app.get(
  '/financial-events',
  verifyToken,
  financialEventController.getFinancialEvents
);

app.get(
  '/financial-events/sum',
  verifyToken,
  financialEventController.getFinancialEventsSum
);

export default app;
