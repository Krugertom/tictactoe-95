import express from 'express';
import { registerRoutes } from './routes/api.routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

registerRoutes(app);

export default app;
