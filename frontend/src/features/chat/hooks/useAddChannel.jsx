import { useMutation } from "@tanstack/react-query";
import axios from 'axios'
import getRoutes from '../../../../src/config/api'
import { useAuthStore } from "../../auth/useAuthStore";

export const useAddChannel = () => {
    const token = useAuthStore((state) => state.token)

    return useMutation({
        mutationFn: async (cData) => {
            const { data } = await axios.post(
                getRoutes('addChannel'), 
                cData, 
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            )
            return data
        }
    })
}