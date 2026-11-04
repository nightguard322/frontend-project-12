import { 
    Paper, 
    Title, 
    Button, 
    Group, 
    TextInput,
    Anchor,
    Text,
    Divider } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useAuthStore } from '../useAuthStore';
import { useLogin } from '../hooks/useLogin';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function LoginPage() {
    const navigate = useNavigate()
    const { t } = useTranslation()
    const loginMutation = useLogin()
    const setCredentials = useAuthStore((state) => state.setCredentials)
    const login = useAuthStore((state) => state.login)

    const form = useForm({
            mode: 'uncontrolled',
            onSubmitPreventDefault: 'always',
            initialValues: {
            username: '',
            password: '',
        },

        validate: {
            name: (value) => (/^.+$/.test(value) ? null : t('errors.login.name')),
            password: (value) => (/^[a-zA-Z0-9]+$/.test(value) ? null : t('errors.login.password'))
        },
    });

    const handleSubmit = (userData) => {
        loginMutation.mutate(userData, {
            onSuccess: (data) => {
                setCredentials(data.token, userData.username)
                login()
                navigate('/')
            },
            onError: (error) => {
                const message = error.response?.data?.message || t('errors.login.common')
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
                        label={t('login.username')}
                        placeholder={t('login.username')}
                        key={form.key('username')}
                        {...form.getInputProps('username')}
                    />
                    <TextInput
                        withAsterisk
                        label={t('common.password')}
                        placeholder="qwerty12345"
                        key={form.key('password')}
                        {...form.getInputProps('password')}
                    />

                    <Group justify="center" mt="md">
                        <Button type="submit">{t('login.submit')}</Button>
                    </Group>
                </form>
                <Divider my="md"/>
                <Group>
                    <Text>{t("login.question")}</Text>
                    <Anchor
                        component={Link}
                        to='/register'
                    >
                    {t("login.register")}
                    </Anchor>
                </Group>
            </Paper>
        </div>
    );
}


