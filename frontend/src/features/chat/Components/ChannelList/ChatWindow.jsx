import { Box, Text, TextInput, ActionIcon } from '@mantine/core';
import { IconSend } from '@tabler/icons-react';
import { useAddMessage } from '../../hooks/useChannelHooks';
import { useChatStore } from '../../useChatStore'
import { useState } from 'react';

export const ChatContainer = () => {

  const createMessageMutation = useAddMessage()
  const addMessageLocal = useChatStore((state) => state.addMessage);
  const messageList = useChatStore((state) => state.messagesByChannel)
  const activeChannelId = useChatStore((state) => state.activeChannelId)
  const [text, setText] = useState('');

  const handleSubmit = () => {
    createMessageMutation.mutate(text, {
        onSuccess: (response) => {
            addMessageLocal(response)
        },
        onError: (err => {
            console.log(JSON.stringify(err))
        })
    })
  }
  return (
    <Box
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh', // или любая другая высота контейнера
        maxWidth: '800px',
        margin: '0 auto',
        border: '1px solid #e0e0e0',
      }}
    >
      {/* Заголовок канала */}
      <Box
        style={{
          padding: '16px',
          borderBottom: '1px solid #e0e0e0',
          backgroundColor: '#f8f9fa',
        }}
      >
        <Text size="sm" fw={700} align="left">
          Название канала
        </Text>
        <Text size="xs" fw={100} align="left" c="dimmed">
          0 сообщений
        </Text>
      </Box>

      {/* Окно сообщений - занимает всё доступное пространство */}
      <Box
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '16px',
          align: 'left',
        }}
      >
        {/* Здесь будут сообщения */}
        {Object.values(messageList[activeChannelId] || [])
          .map(message => {
            return <Box mb="xs">
              <Text 
                component="span" 
                fw={700}
              >{message.username}</Text>
              <Text 
                component="span" 
                align='left'
                key={message.id}
              >: {message.body}</Text>
          </Box> 
        })}
      </Box>

      {/* Поле ввода */}
      <Box
        style={{
          padding: '16px',
          borderTop: '1px solid #e0e0e0',
          backgroundColor: '#fff',
        }}
      >
        <TextInput
          placeholder="Введите сообщение..."
          value={ text }
          onChange={(e) => setText(e.target.value)}
          rightSection={
              <ActionIcon 
                type="button"   // ← Обязательно!
                variant="filled"
                onClick={handleSubmit}
              >
                <IconSend size={16} />
              </ActionIcon>
            }
        />
      </Box>
    </Box>
  );
}