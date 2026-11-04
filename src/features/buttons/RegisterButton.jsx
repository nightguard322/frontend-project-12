import '@mantine/core/styles.css';
import { useNavigate } from "react-router-dom"
import { Button } from '@mantine/core';
import { useTranslation } from 'react-i18next';

export const RegisterButton = () => {
    const navigate = useNavigate()
    const { t } = useTranslation()

    const handleClick = () => {
        navigate('/register')
    }

    return (
        <Button variant="outline" color="blue" onClick={ handleClick }>{t('register.title')}</Button>
    )
    
}