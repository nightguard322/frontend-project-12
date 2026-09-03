import { Button, Group, TextInput } from '@mantine/core';
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
            email: '',
            password: '',
        },

        validate: {
            name: (value) => (/^.+$/.test(value) ? null : 'Invalid name'),
            password: (value) => (/\d/.test(value) ? null : 'Invalid password')
        },
    });

    const handleSubmit = (userData) => {
        console.log('button pushed')
        loginMutation.mutate(userData, {
            onSuccess: (data) => {
                setCredentials(data.token, data.user)
                navigate('/')
            },
            onError: (error) => {
                const message = error.response?.data?.message | 'Неверный логин или пароль'
                form.setFieldError('password', message)
                console.log(error)
            }
        })

    }

    return (
        <div>
            <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
                withAsterisk
                label="Email"
                placeholder="your@email.com"
                key={form.key('email')}
                {...form.getInputProps('email')}
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
            <pre>{JSON.stringify(form.errors, null, 2)}</pre>
        </div>
        
    );
}


