import { Button, Checkbox, Group, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useAuthStore } from '../useAuthStore';

export const Login = () => {
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
        const { login } = useAuthStore()
        login(userData)
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