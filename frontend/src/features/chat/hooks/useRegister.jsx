import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import getRoutes from '/src/config/api'

export const useRegister = () => {
    return useMutation({
        mutationFn: async (formData) => {
            const { data } = await axios.post(getRoutes('addUser'), formData)
            return data
        }
    })
}