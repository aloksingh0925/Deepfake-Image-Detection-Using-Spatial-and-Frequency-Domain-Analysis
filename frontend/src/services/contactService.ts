import { api } from '@/lib/api';

export interface ContactPayload {
    name: string;
    email: string;
    message: string;
}

export const contactService = {
    submit: async (payload: ContactPayload) => {
        const response = await api.post('/contact', payload);
        return response.data;
    }
};
