import { useState } from 'react';
import { Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

export default function TestBug() {
  // Попробуем заменить useDisclosure на обычный useState для проверки
  const [opened, setOpened] = useState(false);

  return (
    <div style={{ padding: 50 }}>
      <h1>Тест кнопки</h1>
      
      {/* Вариант 1: Обычный useState */}
      <Button onClick={() => setOpened(true)}>
        Нажми меня (useState)
      </Button>

      <p>Статус: {opened ? 'Открыто' : 'Закрыто'}</p>
    </div>
  );
}