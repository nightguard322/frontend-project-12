import 'bootstrap/dist/css/bootstrap.min.css'
import { ChannelItem } from './ChannelItem'
import { useChatStore } from '../../useChatStore'
import { Box, Text, ActionIcon, Group, Stack, Menu, Button, Modal } from '@mantine/core';
import { IconPlus, IconChevronDown } from '@tabler/icons-react';
import { useAddChannel, useRemoveChannel, useUpdateChannel } from '../../hooks/useChannelHooks';
import { useDisclosure } from '@mantine/hooks';
import { ChatModal } from '../ChatModal';

export const ChannelsList = () => {
    const channels = useChatStore((state) => state.channels)
    const setActiveChannel = useChatStore((state) => state.setActiveChannel)
    const activeId = useChatStore((state) => state.activeChannelId)

    const createMutation = useAddChannel();
    const updateMutation = useUpdateChannel();
    const deleteMutation = useRemoveChannel();
    
    const addLocal = useChatStore((state) => state.addChannel);
    const updateLocal = useChatStore((state) => state.updateChannel);
    const removeLocal = useChatStore((state) => state.removeChannel);

    const actions = {
        create: { mutation: createMutation, action: addLocal },
        update:   { mutation: updateMutation, action: updateLocal },
        delete: { mutation: deleteMutation, action: removeLocal },
    };

    const [opened, { open, close }] = useDisclosure(false);

    const handleSubmit = (data, mode) => {
        console.log('data before handle submit', data, mode)
        const { action, mutation } = actions[mode];
        mutation.mutate(data, {
            onSuccess: (response) => {
                console.log('res', response)
                action(response)
                close()
            },
            onError: (err => {
                console.log(JSON.stringify(err))
            })
        })
    }


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
                    <ChatModal 
                        opened={opened}
                        onClose={close}
                        handleSubmit={handleSubmit}
                        mode='create'
                    >
                        <Button onClick={close}>Закрыть</Button>
                    </ChatModal>
                </Box>
            </Group>
            <Stack gap={0}>
                {
                Object.values(channels).map((c) => { //channels: {id: {id, name}}, {id2: {id2, name2}}
                    return (<Box
                        key={c.id}
                        onClick={() => setActiveChannel(c.id)}
                        style={{
                            cursor: 'pointer',
                            backgroundColor: activeId === c.id ? '#e7f5ff' : 'transparent'
                        }}
                    >
                        <Group justify='space-between'>
                            <Text>{ c.title }</Text>
                            <Menu>
                                <Menu.Target>
                                    <ActionIcon
                                        variant='subtle'
                                        onClick={(e) => e.stopPropagation()}>
                                            <IconChevronDown/>
                                    </ActionIcon>
                                </Menu.Target>
                                <Menu.Dropdown>
                                    <Menu.Item onClick={() => handleSubmit(c.id, 'delete')}>Удалить</Menu.Item>
                                    <Menu.Item onClick={() => handleSubmit(c.id, 'update')}>Переименовать</Menu.Item>
                                </Menu.Dropdown>
                            </Menu>
                        </Group>
                    </Box>)
                })
                }
            </Stack>
        </Box>
    )
}