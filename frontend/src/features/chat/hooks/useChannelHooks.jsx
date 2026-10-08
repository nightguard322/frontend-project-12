import { useQuery, useMutation } from "@tanstack/react-query";
import axios from 'axios'
import getRoutes from '../../../config/api'
import { useAuthStore } from "../../auth/useAuthStore";

export const useGetChannels = async () => {
    const token = useAuthStore((state) => state.token)
    const { data } = await axios.get(getRoutes('getChannels'), {
        headers: {
          Authorization: `Bearer ${token}`
        }
    })
    console.log('data in query', data)
    return data
    }

export const useAddChannel = () => {
    const token = useAuthStore((state) => state.token)
    return useMutation({
        mutationFn: async ({cData}) => {
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
            return data
        }
    })
}

export const useAddMessage = () => {
    const token = useAuthStore((state) => state.token)
    return useMutation({
        mutationFn: async (message) => {
            console.log('body to post message', message)
            const { data } = await axios.post(
                getRoutes('addMessage'), 
                message, 
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