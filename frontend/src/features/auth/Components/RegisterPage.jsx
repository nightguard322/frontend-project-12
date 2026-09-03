import { Button, Group, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form'
import { useRegister } from '../../chat/hooks/useRegister';
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../useAuthStore';

export const RegisterPage = () => {
    const navigate = useNavigate()
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
                : 'Invalid name'
            ),
            password: (value) => (
                /\d/.test(value) && value.length > 7 
                ? null 
                : 'Invalid password'
            ),
            confirmPass: (value, values) => (
                value === values.password
                ? null 
                : `value: ${value}, password: ${values.password}`
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
                form.setFieldError(submitPass, message)
            }
        }

        )
    }

    return (
        <div>
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
                withAsterisk
                label="username"
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
            <TextInput
                withAsterisk
                label="confirmPass"
                placeholder="qwerty12345"
                key={form.key('confirmPass')}
                {...form.getInputProps('confirmPass')}
            />
            <Group justify="flex-end" mt="md">
                <Button type="submit">Submit</Button>
            </Group>
        </form>
                    <pre>{JSON.stringify(form.errors, null, 2)}</pre>
        </div>
    )
}