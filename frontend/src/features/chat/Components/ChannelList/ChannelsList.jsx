import 'bootstrap/dist/css/bootstrap.min.css'
import { ChannelItem } from './ChannelItem'
import { useChatStore } from '../../useChatStore'
import { Box, Text, ActionIcon, Group, Stack, Menu, Button, Modal } from '@mantine/core';
import { IconPlus, IconChevronDown } from '@tabler/icons-react';
import { useAddChannel, useRemoveChannel, useUpdateChannel } from '../../hooks/useChannelHooks';
import { useDisclosure } from '@mantine/hooks';
import { ChatModal } from '../ChatModal';
import { useState } from 'react';

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
    const [modalState, setModalState] = useState({
        mode: null,
        channelId: null,
        channelTitle: null
    })

    const prepareModal = (mode, id=null) => {
        setModalState({
            mode,
            channelId: id,
            channelTitle: channels[id]?.name || null
        })
        console.log('exists channel name', modalState.channelTitle)
        open()
    }

    const handleSubmit = (data, mode) => {
        const { action, mutation } = actions[mode];
        mutation.mutate(data, {
            onSuccess: (response) => {
                console.log('success response', response)
                updateLocal(response)
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
                        <ActionIcon variant="outline" onClick={() => prepareModal('create')}>
                        <IconPlus size={16} />
                        </ActionIcon>
                    </Group>
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
                                    <Menu.Item onClick={() => prepareModal('delete', c.id)}>Удалить</Menu.Item>
                                    <Menu.Item onClick={() => prepareModal('update', c.id)}>Переименовать</Menu.Item>
                                </Menu.Dropdown>
                            </Menu>
                        </Group>
                    </Box>)
                })
                
                }
                <ChatModal 
                    opened={opened}
                    onClose={close}
                    handleSubmit={handleSubmit}
                    mode={modalState.mode}
                    channelId={modalState.channelId}
                    channelTitle={ modalState.channelTitle }
                >
                <Button onClick={close}>Закрыть</Button>
                </ChatModal>
            </Stack>
        </Box>
    )
}