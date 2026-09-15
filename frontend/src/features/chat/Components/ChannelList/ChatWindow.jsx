import { Box, Text, TextInput, ActionIcon } from '@mantine/core';
import { IconSend } from '@tabler/icons-react';

export const ChatContainer = () => {
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
        <Text align='left'>Сообщение 1</Text>
        <Text align='left'>Сообщение 2</Text>
        <Text align='left'>Сообщение 3</Text>
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
          rightSection={
            <ActionIcon variant="filled">
              <IconSend size={16} />
            </ActionIcon>
          }
        />
      </Box>
    </Box>
  );
}