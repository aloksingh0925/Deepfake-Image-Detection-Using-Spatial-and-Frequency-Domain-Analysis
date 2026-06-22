import { predictMedia } from '../controllers/predictionController.ts';
import { Hono } from 'hono';

const predictionRoutes = new Hono();

predictionRoutes.post('/predict', predictMedia);

export default predictionRoutes;
