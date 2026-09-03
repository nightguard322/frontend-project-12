import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import getRoute from '../../../config/api'

export const useLogin = () => {
    return useMutation({
        mutationFn: async (userData) => {
            const { data } = await axios.post(getRoute('addCredentials'), userData)
            return data;
        },
    });
}