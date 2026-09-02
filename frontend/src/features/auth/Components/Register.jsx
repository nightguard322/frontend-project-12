import { Button, Group, TextInput } from '@mantie/core';
import { useForm } from '@mantie/form'
import { useRegister } from '../../chat/hooks/useRegister';
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../useAuthStore';

export const Register = () => {
    const navigate = useNavigate()
    const registerMutation = useRegister()
    const setCredentials = useAuthStore((state) => state.setCredentials)

    const form = useForm({
        mode: 'uncontrolled',
        onSubmitPreventDefault: 'always',
        initialValues: {
            name: '',
            password: '',
            confirmPass: ''
        },

        validate: {
            name: (value) => (
                /^.+$/.test(value) && value.length > 2 
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
                : 'Пароли не совпадают'
            )
        },
    });

    const handleSubmit = (formData) => {
        registerMutation.mutate(formData, {
            onSuccess: () => {
                setCredentials(formData)
                navigate('/')
            },
            onError: (error) => {
                const message = error.response?.data?.message || 'Что то пошло не так'
                form.setFieldError(confirmPass, message)
            }
        }

        )
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
            <TextInput
                withAsterisk
                label="submitPass"
                placeholder="qwerty12345"
                key={form.key('submitPass')}
                {...form.getInputProps('submitPass')}
            />
            <Group justify="flex-end" mt="md">
                <Button type="submit">Submit</Button>
            </Group>
        </form>
    )
}