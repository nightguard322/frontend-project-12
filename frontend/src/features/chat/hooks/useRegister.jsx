import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import getRoutes from '/src/config/api'

export const useRegister = () => {
    return useMutation({
        mutationFn: async (formData) => {
            const { data } = axios.post(getRoutes('/api/v1/signup'), formData)
            return data
        }
    })
}