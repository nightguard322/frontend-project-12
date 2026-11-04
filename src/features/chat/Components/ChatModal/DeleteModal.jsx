import { Group, Button, Box } from '@mantine/core';
import { Modal } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { notifications } from '@mantine/notifications';

export const DeleteModal = ({ 
    opened,
    onClose,
    handleSubmit,
    channelId,
    isRemovable,
    }) => {

    const mode = 'deleteChannel'
    const { t } = useTranslation();
    return (
        <>
            <Modal opened={opened} onClose={onClose} title centered>
                <Box>   
                    {t(`channelsList.delete.confirmationQ`)}
                    <Group justify="flex-end" mt="md">
                    <Button variant="outline" onClick={onClose}>{t(`channelsList.cancel`)}</Button>
                    <Button 
                        type="submit"
                        autoFocus
                        onClick={() => {
                            if (!isRemovable) {
                                notifications.show({
                                    title: t('errors.cannot_delete'),
                                    color: 'red',
                                });
                                onClose()
                                return;
                            }
                            notifications.show({
                                title: t('channelsList.delete.message'),
                                color: 'green',
                            });
                            handleSubmit({id: channelId, isRemovable}, mode)
                        }}
                        onKeyDown={(e) => isRemovable 
                            && 
                            (e.key === 'Enter' && handleSubmit({id: channelId, isRemovable}, mode))
                        }
                        data-autofocus
                    >
                        {t(`channelsList.delete.title`)}
                    </Button>
                    </Group>
                </Box>
            </Modal>
        </>
    )
}