import ApiError from '../utils/ApiError.ts';
import catchAsync from '../utils/catchAsync.ts';
import { Context } from 'hono';

export const submitContact = catchAsync(async (c: Context) => {
    const body = await c.req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
        throw new ApiError(400, 'Name, email, and message are required');
    }

    // TODO: Store in database when MongoDB replica set is configured
    // const contact = await prisma.contact.create({
    //   data: {
    //     name,
    //     email,
    //     message,
    //   },
    // });

    return c.json({
        success: true,
        id: crypto.randomUUID(),
        message: 'Message received successfully'
    });
});
