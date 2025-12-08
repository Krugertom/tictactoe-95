import express from 'express';
import cors from 'cors';
import { registerRoutes } from '@/routes/api.routes';

const app = express();

//TODO: Update this (only for dev testing)
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

registerRoutes(app);

export default app;
