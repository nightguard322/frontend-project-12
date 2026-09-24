import { useMutation } from "@tanstack/react-query";
import axios from 'axios'
import getRoutes from '../../../config/api'
import { useAuthStore } from "../../auth/useAuthStore";

export const useAddChannel = () => {
    const token = useAuthStore((state) => state.token)
    return useMutation({
        mutationFn: async ({cData}) => {
            console.log('data to create', cData)
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

export const useRemoveChannel = () => {
    const token = useAuthStore((state) => state.token)

    return useMutation({
        mutationFn: async ({id}) => {
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
        mutationFn: async ({id, cData}) => {
            console.log('new data to patch', cData, 'to id', id)
            const { data } = await axios.patch(
                `/api/v1/channels/${id}`,
                cData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            )
            console.log(token)
            console.log('data from response inside mutation', data)
            return data
        }
    })
}