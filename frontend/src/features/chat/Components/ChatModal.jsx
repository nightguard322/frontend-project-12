import { TextInput, Group, Button, Box, Text } from '@mantine/core';
import { Modal } from '@mantine/core';
import { useState } from 'react';

export const ChatModal = ({ 
    opened,
    onClose,
    mode,
    handleSubmit,
    channelId = null,
    channelTitle,
    isInvalid,
    }) => {

    const isDeleteMode = mode === 'deleteChannel'
    const titles = {
        create: 'Добавить канал',
        update: 'Переименовать канал',
        delete: 'Удалить канал',
    }

const [cname, setName] = useState('')

  return (
    <>
      <Modal opened={opened} onClose={onClose} title={titles[mode]} centered>
        { isDeleteMode ?
            <Box>
                Уверены?
                <Group justify="flex-end" mt="md">
                    <Button onClick={onClose}>
                    Отмена</Button>
                    <Button 
                        type="submit" 
                        onClick={
                            (e) => {
                                e.preventDefault()
                                handleSubmit({id: channelId}, mode)
                            }}
                    >
                    Отправить
                    </Button>
                </Group>
            </Box>
            :
            <form onSubmit={
                (e) => {
                    e.preventDefault()
                    console.log('Я получил имя для отправки', cname)
                    handleSubmit({cData: { name: cname }, id: channelId}, mode)
                }
            }
            >
                <TextInput
                    name="title"
                    withAsterisk
                    label="Имя канала"
                    placeholder="channel name"
                    defaultValue={ channelTitle }
                    onChange={ (e) => setName(e.target.value) }
                />
                <Group justify="flex-end" mt="md">
                    <Button onClick={onClose}>Отмена</Button>
                    <Button type="submit" disabled={isInvalid(cname)}>Отправить</Button>
                </Group>
            </form>
        }
      </Modal>
    </>
  );
}