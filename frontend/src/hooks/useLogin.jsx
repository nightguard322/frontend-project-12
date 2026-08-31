import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export default () => {
    return useMutation({
        mutationFn: async (userData) => {
            const { data } = await axios.post('/api/v1/login', userData)
            return data;
        },
    });
}