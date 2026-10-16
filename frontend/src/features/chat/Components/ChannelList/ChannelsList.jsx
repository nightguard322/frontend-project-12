import 'bootstrap/dist/css/bootstrap.min.css'
import { useQuery } from "@tanstack/react-query";
import { useChatStore } from '../../useChatStore'
import { Box, Text, ActionIcon, Group, Stack, Menu, Button, Modal } from '@mantine/core';
import { IconPlus, IconChevronDown } from '@tabler/icons-react';
import { 
    getChannels,
    useAddChannel,
    useRemoveChannel,
    useUpdateChannel
} from '../../hooks/useChannelHooks';
import { useDisclosure } from '@mantine/hooks';
import { ChatModal } from '../ChatModal';
import { useState, useEffect } from 'react';

export const ChannelsList = () => {
    const channelsInStore = useChatStore((state) => state.channels)
    const setActiveChannel = useChatStore((state) => state.setActiveChannel)
    const activeId = useChatStore((state) => state.activeId)

    const createChannelMutation = useAddChannel();
    const updateChannelMutation = useUpdateChannel();
    const deleteChannelMutation = useRemoveChannel();
    // const getChannelsList = useGetChannels()
    
    const { data, isLoading, error, status } = useQuery({
        queryKey: ['channels'],
        queryFn: getChannels
    });

    const loadChannelsList = useChatStore((state) => state.loadChannelsList)
    const addChannelLocal = useChatStore((state) => state.addChannel);
    const updateChannelLocal = useChatStore((state) => state.updateChannel);
    const removeChannelLocal = useChatStore((state) => state.removeChannel);

    const actions = {
        createChannel: { mutation: createChannelMutation, action: addChannelLocal },
        updateChannel: { mutation: updateChannelMutation, action: updateChannelLocal },
        deleteChannel: { mutation: deleteChannelMutation, action: removeChannelLocal },
    };

    const [opened, { open, close }] = useDisclosure(false);
    const [modalState, setModalState] = useState({
        mode: null,
        channelId: null,
        channelTitle: null
    })


    useEffect(() => {
        if (data) {
            loadChannelsList(data)
        }
    }, [data, loadChannelsList])

    const prepareModal = (mode, id=null) => {
        setModalState({
            mode,
            channelId: id,
            channelTitle: channelsInStore[id]?.name || null
        })
        open()
    }

    const isInvalid = (str) => {
        const channelsList = Object.values(channelsInStore)
        return (
            channelsList.some(c => c.name === str)
            ||
            str === '')
    }

    const handleSubmit = (data, mode) => {
        const { action, mutation } = actions[mode];
        if (mode === 'createChannel') {
            const cName = data.cData.name
            if (isInvalid(cName)) {
                console.log('invalid name in validator', cName)
                return
            }
        }
        console.log('submit pushed')
        mutation.mutate(data, {
            onSuccess: (response) => {
                action(response)
                if (activeId === null) {
                    setActiveChannel(response.id)
                }
                close()
            },
            onError: (err => {
                console.log(JSON.stringify(err))
                console.log(err)
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
                        <ActionIcon variant="outline" onClick={() => prepareModal('createChannel')}>
                        <IconPlus size={16} />
                        </ActionIcon>
                    </Group>
                </Box>
            </Group>
            <Stack gap={0}>
                {
                isLoading 
                ?
                <div>Загрузка...</div>
                :
                Object.values(channelsInStore).map((c) => { //channels: {id: {id, name}}, {id2: {id2, name2}}
                    if (activeId === null) setActiveChannel(c.id)
                    console.log(channelsInStore[activeId])
                    return (<Box
                        key={c.id}
                        onClick={() => setActiveChannel(c.id)}
                        style={{
                            cursor: 'pointer',
                            backgroundColor: c.id === activeId ? 'lightgray' : 'transparent'
                        }}
                    >
                        <Group justify='space-between'>
                            <Text>{ c.name }</Text>
                            <Menu>
                                <Menu.Target>
                                <ActionIcon 
                                        variant='subtle' 
                                        onClick={(e) => e.stopPropagation()} // Останавливаем здесь
                                    >
                                    <IconChevronDown/>
                                </ActionIcon>
                                </Menu.Target>
                                <Menu.Dropdown>
                                    <Menu.Item onClick={(e) => {
                                        e.stopPropagation()
                                        prepareModal('deleteChannel', c.id)
                                    }}>
                                    Удалить
                                    </Menu.Item>
                                    <Menu.Item onClick={(e) => {
                                        e.stopPropagation()
                                        prepareModal('updateChannel', c.id)
                                    }}>
                                        Переименовать
                                    </Menu.Item>
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
                    isInvalid={isInvalid}
                >
                <Button onClick={close}>Закрыть</Button>
                </ChatModal>
            </Stack>
        </Box>
    )
}