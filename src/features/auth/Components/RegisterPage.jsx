import { 
    Center,
    Paper,
    Title,
    Button,
    Group,
    TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form'
import { useRegister } from '../../chat/hooks/useRegister';
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../useAuthStore';
import { useTranslation } from 'react-i18next';

export const RegisterPage = () => {
    const navigate = useNavigate()
    const { t } = useTranslation()
    const registerMutation = useRegister()
    const setCredentials = useAuthStore((state) => state.setCredentials)

    const form = useForm({
        mode: 'uncontrolled',
        onSubmitPreventDefault: 'always',
        initialValues: {
            username: '',
            password: '',
            confirmPass: ''
        },

        validate: {
            username: (value) => (
                ((/^.+$/.test(value)) && (value.length > 2)) 
                ? null 
                : t('errors.register.name')
            ),
            password: (value) => (
                /^[a-zA-Z0-9]+$/.test(value)
                ? null 
                : t('errors.register.password')
            ),
            confirmPass: (value, values) => (
                value === values.password
                ? null 
                : t('errors.register.confirm')
            )
        },
    });

    const handleSubmit = (formData) => {
        registerMutation.mutate(formData, {
            onSuccess: (data) => {
                setCredentials(data)
                navigate('/')
            },
            onError: (error) => {
                const message = error.response?.data?.message || 'Что то пошло не так'
                form.setFieldError('confirmPass', message)
            }
        }

        )
    }

    return (
        <Center style={{ minHeight: '100vh' }}> 
            <Paper shadow="md" p="xl" radius="md" withBorder style={{ maxWidth: 400, width: '100%' }}>
                <Title order={2} align="center" mb="md">{t("register.title")}</Title>
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <TextInput
                        withAsterisk
                        label={t("register.username")}
                        placeholder={t("register.username")}
                        key={form.key('username')}
                        {...form.getInputProps('username')}
                    />
                    <TextInput
                        withAsterisk={false} 
                        label={t("common.password")}
                        placeholder="qwerty12345"
                        key={form.key('password')}
                        {...form.getInputProps('password')}
                    />
                    <TextInput
                        withAsterisk={false} 
                        label={t("register.passwordConfirm")}
                        placeholder="qwerty12345"
                        key={form.key('confirmPass')}
                        {...form.getInputProps('confirmPass')}
                    />
                    <Group justify="center" mt="md">
                        <Button type="submit">{t("register.submit")}</Button>
                    </Group>
                </form>
            </Paper>
        </Center>
    )
}