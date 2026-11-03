import '@mantine/core/styles.css';
import { useNavigate } from "react-router-dom"
import { Button } from '@mantine/core';

export const RegisterButton = () => {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/register')
    }

    return (
        <Button variant="outline" color="blue" onClick={ handleClick }>Зарегистрироваться</Button>
    )
    
}