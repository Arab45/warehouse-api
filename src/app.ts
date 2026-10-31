import express from 'express';
import inventoryRouter from './routes/inventory';

export const app = express();

app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/inventory', inventoryRouter);
