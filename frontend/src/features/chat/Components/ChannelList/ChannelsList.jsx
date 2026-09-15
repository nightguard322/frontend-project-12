import 'bootstrap/dist/css/bootstrap.min.css'
import { ChannelItem } from './ChannelItem'
import { useChatStore } from '../../useChatStore'
import { Box, Text, TextInput, ActionIcon, Button, Group, List, Menu } from '@mantine/core';
import { IconPlus, IconChevronDown } from '@tabler/icons-react';

export const ChannelsList = () => {
    const channels = [{id: 1, name: 'test'}, {id: 2, name: 'test2'}]
    const setActiveId = useChatStore((state) => state.setActiveChannel)
    const activeId = useChatStore((state) => state.activeChannelId)
    return (
        <Box style={{
            padding: '16px',
        }}>
            <Group justify='space-between'>
                <Text>Каналы</Text>
                <ActionIcon variant="outline" aria-label="Settings">
                    <IconPlus size={12} />
                </ActionIcon>
            </Group>
            <List>
                {
                channels.map((c) => (
                    <List.Item
                        key={c.id}
                        onClick={setActiveId(c.id)}
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
                    </List.Item>
                ))
                }
            </List>
        </Box>
    )
}