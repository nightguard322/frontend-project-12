import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import getRoutes from '../../../config/api.jsx'

export const useRegister = () => {
    return useMutation({
        mutationFn: async (formData) => {
            const { data } = await axios.post(getRoutes('addUser'), formData)
            return data
        }
    })
}