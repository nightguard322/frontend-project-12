import '@mantine/core/styles.css';
import { useNavigate } from "react-router-dom"
import { useAuthStore } from "../auth/useAuthStore"
import { Button } from '@mantine/core';
import { useQueryClient } from "@tanstack/react-query";

export const ExitButton = () => {
    const navigate = useNavigate()
    const logout = useAuthStore((state) => state.logout)
    const queryClient = useQueryClient()

    const handleClick = () => {
        logout();
        queryClient.clear()
        navigate('/login')
    }

    return (
        <Button variant="outline" color="blue" onClick={ handleClick }>Выход</Button>
    )
    
}