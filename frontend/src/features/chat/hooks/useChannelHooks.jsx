import { useMutation } from "@tanstack/react-query";
import axios from 'axios'
import getRoutes from '../../../config/api'
import { useAuthStore } from "../../auth/useAuthStore";

export const useAddChannel = () => {
    const token = useAuthStore((state) => state.token)
    console.log('starting add mutation')
    return useMutation({
        mutationFn: async (cData) => {
            console.log('data to add', cData)
            const { data } = await axios.post(
                getRoutes('addChannel'), 
                cData, 
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            )
            console.log('response after create', data)
            return data
        }
    })
}

export const useRemoveChannel = () => {
    const token = useAuthStore((state) => state.token)

    return useMutation({
        mutationFn: async (id) => {
            const { data } = await axios.delete(
                getRoutes('removeChannel', id),
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

export const useUpdateChannel = () => {
    const token = useAuthStore((state) => state.token)

    return useMutation({
        mutationFn: async (id, cData) => {
            const { data } = await axios.patch(
                getRoutes('updateChannel', id),
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