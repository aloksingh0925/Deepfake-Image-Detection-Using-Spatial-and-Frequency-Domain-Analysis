import { errorHandler } from './middlewares/error.ts';
import authRoutes from './routes/auth.routes.ts';
import contactRoutes from './routes/contact.routes.ts';
import predictionRoutes from './routes/prediction.routes.ts';
import ApiError from './utils/ApiError.ts';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { secureHeaders } from 'hono/secure-headers';

const app = new Hono();

// set security HTTP headers only in production
if (process.env.NODE_ENV === 'production') app.use(secureHeaders());

// Note: compress() middleware is intentionally NOT used as it blocks streaming responses
// If you need compression for non-streaming routes, apply it selectively per route

// enable cors
app.use(cors());

// removing this route will result in error in server startup so its strictly prohibited to remove this route
app.get('/', c => {
    return c.text('Server is up and running');
});

// removing this route is strictly prohibited
app.get('/version.json', c => {
    return c.json({ version: parseInt(process.env.VERSION || '0') });
});

app.get('/health', c => {
    return c.text('OK');
});

// Mount routes
app.route('/auth', authRoutes);
app.route('/prediction', predictionRoutes);
app.route('/contact', contactRoutes);

// send back a 404 error for any unknown api request
app.notFound(() => {
    throw new ApiError(404, 'Not found');
});

// handle error
app.onError((err, c) => {
    return errorHandler(err, c);
});

export default app;
