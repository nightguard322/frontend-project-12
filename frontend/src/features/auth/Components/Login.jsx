import { Paper, Title, Button, Group, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useAuthStore } from '../useAuthStore';
import { useLogin } from '../hooks/useLogin';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
    const navigate = useNavigate()
    const loginMutation = useLogin()
    const setCredentials = useAuthStore((state) => state.setCredentials)

    const form = useForm({
            mode: 'uncontrolled',
            onSubmitPreventDefault: 'always',
            initialValues: {
            username: '',
            password: '',
        },

        validate: {
            name: (value) => (/^.+$/.test(value) ? null : 'Invalid name'),
            password: (value) => (/^[a-zA-Z0-9]+$/.test(value) ? null : 'Invalid password')
        },
    });

    const handleSubmit = (userData) => {
        loginMutation.mutate(userData, {
            onSuccess: (data) => {
                setCredentials(data.token, data.user)
                navigate('/')
            },
            onError: (error) => {
                const message = error.response?.data?.message | 'Неверный логин или пароль'
                form.setFieldError('password', message)
            }
        })

    }

    return (
            <div className='d-flex align-items-center justify-content-center'>
            <Paper shadow="md" p="xl" radius="md" withBorder style={{ maxWidth: 400, width: '100%' }}>
                <Title order={2} align="center" mb="md">Вход в систему</Title>
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <TextInput
                        withAsterisk
                        label="Username"
                        placeholder="username"
                        key={form.key('username')}
                        {...form.getInputProps('username')}
                    />
                    <TextInput
                        withAsterisk
                        label="password"
                        placeholder="qwerty12345"
                        key={form.key('password')}
                        {...form.getInputProps('password')}
                    />

                    <Group justify="flex-end" mt="md">
                        <Button type="submit">Submit</Button>
                    </Group>
                </form>
            </Paper>
        </div>
    );
}


