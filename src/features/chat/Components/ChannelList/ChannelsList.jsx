import 'bootstrap/dist/css/bootstrap.min.css'
import { useQuery } from "@tanstack/react-query";
import { useChatStore } from '../../useChatStore'
import { Box, Text, ActionIcon, Group, Stack, Menu, Button, UnstyledButton } from '@mantine/core';
import { IconPlus, IconChevronDown } from '@tabler/icons-react';
import { 
    getChannels,
    useAddChannel,
    useRemoveChannel,
    useUpdateChannel
} from '../../hooks/useChannelHooks';
import { useDisclosure } from '@mantine/hooks';
import { DeleteModal } from '../ChatModal/DeleteModal.jsx'
import { EntityFormModal } from '../ChatModal/EntityModalForm.jsx';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const ChannelsList = () => {
    const { t } = useTranslation();
    const channelsInStore = useChatStore((state) => state.channels)
    const setActiveChannel = useChatStore((state) => state.setActiveChannel)
    const activeId = useChatStore((state) => state.activeId)

    const createChannelMutation = useAddChannel();
    const updateChannelMutation = useUpdateChannel();
    const deleteChannelMutation = useRemoveChannel();
    // const getChannelsList = useGetChannels()
    
    const { data, isLoading} = useQuery({
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
        channelTitle: null,
        removable: true
    })

    useEffect(() => {
        if (data) {
            loadChannelsList(data)
        }
    }, [data, loadChannelsList])

    const prepareModal = (mode, id=null, removable=false) => {
        setModalState({
            mode,
            channelId: id,
            channelTitle: channelsInStore[id]?.name || null,
            removable
        })
        open()
    }

    const handleSubmit = (data, mode) => {
        const { action, mutation } = actions[mode];


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

    const channelsList = Object.values(channelsInStore)
    return (
        <Box style={{
            padding: '16px',
        }}>
            <Group justify='space-between'>
                <Box p="md">
                    <Group justify="space-between">
                        <Text>{t('channelsList.create.title')}</Text>
                        <ActionIcon variant="outline" onClick={() => prepareModal('createChannel')}>
                            +
                        </ActionIcon>
                    </Group>
                </Box>
            </Group>
            <Stack gap={0}>
                {
                isLoading 
                ?
                <div>{t('common.loading')}</div>
                :
                channelsList.map((c) => { //channels: {id: {id, name}}, {id2: {id2, name2}}
                    if (activeId === null) setActiveChannel(c.id)
                    return (
                    <Group key={c.id}>
                        <UnstyledButton
                            onClick={() => setActiveChannel(c.id)}
                            style={{
                                flex: 1,
                                cursor: 'pointer',
                                backgroundColor: c.id === activeId ? 'lightgray' : 'transparent'
                            }}>
                            { `# ${c.name}` }
                        </UnstyledButton>
                        { c.removable && <Menu>
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
                                    prepareModal('deleteChannel', c.id, c.removable)
                                }}>
                                {t('channelsList.delete.title')}
                                </Menu.Item>
                                <Menu.Item onClick={(e) => {
                                    e.stopPropagation()
                                    prepareModal('updateChannel', c.id)
                                }}>
                                    {t('channelsList.update.title')}
                                </Menu.Item>
                            </Menu.Dropdown>
                        </Menu>
                        }
                    </Group>)
                })
                
                }
                {/* <ChatModal 
                    opened={opened}
                    onClose={close}
                    handleSubmit={handleSubmit}
                    mode={modalState.mode}
                    channelId={modalState.channelId}
                    channelTitle={ modalState.channelTitle }
                    isRemovable={ modalState.removable }
                >
                <Button onClick={close}>{t('channelsList.closeButton')}</Button>
                </ChatModal> */}

                {modalState.mode === 'deleteChannel' && (
                    <DeleteModal
                        opened={opened}
                        onClose={close}
                        handleSubmit={handleSubmit}
                        channelId={modalState.channelId}
                        channelTitle={ modalState.channelTitle }
                        isRemovable={ modalState.removable }
                    >
                    <Button onClick={close}>{t('channelsList.closeButton')}</Button>
                    </DeleteModal>
                )}
                {
                    (modalState.mode === 'createChannel' 
                    || 
                    modalState.mode === 'updateChannel')
                    && (
                        <EntityFormModal
                            opened={opened}
                            onClose={close}
                            handleSubmit={handleSubmit}
                            channelId={modalState.channelId}
                            channelTitle={ modalState.channelTitle }
                            mode={modalState.mode}
                            channelsList={channelsList}
                        >
                        <Button onClick={close}>{t('channelsList.closeButton')}</Button>
                        </EntityFormModal>
                    )
                }
            </Stack>
        </Box>
    )
}