import { submitContact } from '../controllers/contactController.ts';
import { Hono } from 'hono';

const contactRoutes = new Hono();

contactRoutes.post('/', submitContact);

export default contactRoutes;
