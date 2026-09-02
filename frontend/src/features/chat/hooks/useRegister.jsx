import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export default useRegister = () => {
    return useMutation({
        mutationFn: async (formData) => {
            const { data } = axios.post('/api/v1/signup', formData)
            return data
        }
    })
}