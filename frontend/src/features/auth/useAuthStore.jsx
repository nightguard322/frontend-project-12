import { create } from 'zustand';
import { useMutation } from '@tanstack/react-query';

export const useAuthStore = create((set) => ({
    token: localStorage.getItem('token') || null,
    user: null,
    login: () => {
        return useMutation({
            mutationFn: async (userData) => {
                const { data } = axios.post('/api/v1/login', userData)
            }
        })
    }

    // login: (userData) => {
    // localStorage.setItem('token', userData.token);
    // set({ token: userData.token, user: userData.user });

}))