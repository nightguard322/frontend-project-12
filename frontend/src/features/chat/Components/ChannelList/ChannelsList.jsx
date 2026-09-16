import 'bootstrap/dist/css/bootstrap.min.css'
import { ChannelItem } from './ChannelItem'
import { useChatStore } from '../../useChatStore'
import { Box, Text, ActionIcon, Group, Stack, Menu, Button, Modal } from '@mantine/core';
import { IconPlus, IconChevronDown } from '@tabler/icons-react';
import { useAddChannel } from '../../hooks/useAddChannel';
import { useDisclosure } from '@mantine/hooks';
import { AddChatModal } from '../addChatModal';

export const ChannelsList = () => {
    const channels = [{id: 1, name: 'test'}, {id: 2, name: 'test2'}]
    const setActiveChannel = useChatStore((state) => state.setActiveChannel)
    const activeId = useChatStore((state) => state.activeChannelId)
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <Box style={{
            padding: '16px',
        }}>
            <Group justify='space-between'>
                <Box p="md">
                    <Group justify="space-between">
                        <Text>Каналы</Text>
                        <ActionIcon variant="outline" onClick={open}>
                        <IconPlus size={16} />
                        </ActionIcon>
                    </Group>
                    <AddChatModal opened={opened} onClose={close} title="Добавить">
                        <Button onClick={close}>Закрыть</Button>
                    </AddChatModal>
                </Box>
            </Group>
            <Stack gap={0}>
                {
                channels.map((c) => (
                    <Box
                        key={c.id}
                        onClick={() => setActiveChannel(c.id)}
                        style={{
                            cursor: 'pointer',
                            backgroundColor: activeId === c.id ? '#e7f5ff' : 'transparent'
                        }}
                    >
                        <Group justify='space-between'>
                            <Text>{ c.name }</Text>
                            <Menu>
                                <Menu.Target>
                                    <ActionIcon
                                        variant='subtle'
                                        onClick={(e) => e.stopPropagation()}>
                                            <IconChevronDown/>
                                    </ActionIcon>
                                </Menu.Target>
                                <Menu.Dropdown>
                                    <Menu.Item>Удалить</Menu.Item>
                                    <Menu.Item>Переименовать</Menu.Item>
                                </Menu.Dropdown>
                            </Menu>
                        </Group>
                    </Box>
                ))
                }
            </Stack>
        </Box>
    )
}