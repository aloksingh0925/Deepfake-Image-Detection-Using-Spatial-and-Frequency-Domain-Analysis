import app from './app.ts';
import prisma from './client.ts';
import { serve } from '@hono/node-server';
import dotenv from 'dotenv';

let server: any;

dotenv.config();

console.log('Starting');
async function main() {
    try {
        await prisma.$connect();
        console.log('✓ Database connected successfully');
    } catch (error) {
        console.error('✗ Database connection failed:', error);
        process.exit(1);
    }

    server = serve({
        fetch: app.fetch,
        port: (process.env.PORT || 3000) as number
    });

    console.log(`✓ Server running on port ${process.env.PORT || 3000}`);

    const exitHandler = () => {
        if (server) {
            server.close(() => {
                process.exit(1);
            });
        } else {
            process.exit(1);
        }
    };

    const unexpectedErrorHandler = () => {
        exitHandler();
    };

    process.on('uncaughtException', unexpectedErrorHandler);
    process.on('unhandledRejection', unexpectedErrorHandler);

    process.on('SIGTERM', () => {
        console.log('SIGTERM received, shutting down gracefully');
        if (server) {
            server.close();
        }
    });
}

main().catch(error => {
    console.error('Fatal error starting server:', error);
    process.exit(1);
});
