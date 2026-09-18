import { TextInput, Group, Button, Box, Text } from '@mantine/core';
import { Modal } from '@mantine/core';

export const ChatModal = ({ 
    opened,
    onClose,
    mode,
    handleSubmit,
    cData = {}
    }) => {

    const isDeleteMode = mode === 'delete'
    const titles = {
        create: 'Добавить канал',
        update: 'Переименовать канал',
        delete: 'Удалить канал',
    }

  return (
    <>
      <Modal opened={opened} onClose={onClose} title={titles[mode]} centered>
        { isDeleteMode ?
            <Box>
                Уверены?
                <Group justify="flex-end" mt="md">
                    <Button onClick={onClose}>Отмена</Button>
                    <Button type="submit">Отправить</Button>
                </Group>
            </Box>
            :
            <form onSubmit={(e) => {
                e.preventDefault()
                const title = e.currentTarget.title.value
                handleSubmit({title}, mode)}}>
                <TextInput
                    name="title"
                    withAsterisk
                    label="Имя канала"
                    placeholder="channel name"
                    defaultValue={ cData.title }
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