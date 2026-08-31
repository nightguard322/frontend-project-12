import { Button, Group, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useAuthStore } from '../useAuthStore';
import useLogin from '../../../hooks/useLogin';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const navigate = useNavigate()
    const loginMutation = useLogin()
    const setCredentials = useAuthStore((state) => state.setCredentials)

    const form = useForm({
            mode: 'uncontrolled',
            onSubmitPreventDefault: 'always',
            initialValues: {
            name: '',
            password: '',
        },

        validate: {
            name: (value) => (/^.+$/.test(value) ? null : 'Invalid name'),
            password: (value) => (/\d/.test(value) ? null : 'Invalid password')
        },
    });

    const handleSubmit = (userData) => {
        //отправить get к серверу, получить ответ и выдать ошибку или редирект на корень
        loginMutation.mutate(userData, {
            onSuccess: (data) => {
                setCredentials(data.token, data.user)
                navigate('/')
            },
            onError: (error) => {
                console.log(error)
            }
        })
        const { setCredentials } = useAuthStore()

    }

    return (
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
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
    );
}