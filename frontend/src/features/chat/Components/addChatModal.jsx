import { TextInput, Group, Button } from '@mantine/core';
import { Modal } from '@mantine/core';
import { useForm } from '@mantine/form'
import { useChatStore } from '../useChatStore';
import { useAddChannel } from '../hooks/useAddChannel';

export const AddChatModal = ({ opened, onClose }) => {
    const addChannel = useChatStore((state) => state.addChannel)
    const addChannelMutation = useAddChannel()

    const form = useForm({
        mode: 'uncontrolled',
        onSubmitPreventDefault: 'always',
        initialValues: {
            title: '',
        },
        validate: {
            title: (value) => (
                /^.+$/.test(value)
                ? null 
                : 'Invalid name'
            ),
        }
    })

    const handleSubmit = (cData) => {
        addChannelMutation.mutate(cData, {
            onSuccess: (response) => {
                addChannel(response)
                console.log('sucess adding channel')
                onClose()
            },
            onError: (error) => {
                const message = error.response?.data?.message || 'error adding channel'
                console.log(error)
            }
        })
    }

  return (
    <>
      <Modal opened={opened} onClose={onClose} title="Добавить канал" centered>
        {
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <TextInput
                    withAsterisk
                    label="Имя канала"
                    placeholder="channel name"
                    key={form.key('title')}
                    {...form.getInputProps('title')}
                />
                <Group justify="flex-end" mt="md">
                    <Button onClick={onClose}>Отмена</Button>
                    <Button type="submit">Отправить</Button>
                </Group>
            </form>
        }
      </Modal>
    </>
  );
}