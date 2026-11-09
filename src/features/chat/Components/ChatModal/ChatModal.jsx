import { TextInput, Group, Button, Box } from '@mantine/core';
import { Modal } from '@mantine/core';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import filter from '../../utils/chatFilter.jsx'

export const ChatModal = ({ 
    opened,
    onClose,
    mode,
    handleSubmit,
    channelId = null,
    channelTitle,
    isRemovable,
    }) => {

    const { t } = useTranslation
    const isDeleteMode = mode === 'deleteChannel'
    const titles = {
        create: t('channelsList.create'),
        update: t('channelsList.update'),
        delete: t('channelsList.delete'),
    }

const [cname, setName] = useState('')

  return (
    <>
      <Modal opened={opened} onClose={onClose} title={titles[mode]} centered>
        { isDeleteMode ?
            <Box>
                {t('channelsList.modal.confirmationQ')}?
                <Group justify="flex-end" mt="md">
                <Button onClick={onClose}>Отмена</Button>
                <Button 
                    type="submit"
                    autoFocus
                    onClick={() => handleSubmit({id: channelId, isRemovable}, mode)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSubmit({id: channelId, isRemovable}, mode)}
                    data-autofocus
                >
                    { titles[mode] }
                </Button>
                </Group>
            </Box>
            :
            <form onSubmit={
                (e) => {
                    e.preventDefault()
                    const filteredTitle = filter.clean(cname)
                    handleSubmit({cData: { name: filteredTitle}, id: channelId}, mode)
                }
            }
            >
                <TextInput
                    name="title"
                    withAsterisk
                    label="Имя канала"
                    placeholder="channel name"
                    defaultValue={ channelTitle }
                    onChange={ (e) => setName(e.target.value) }
                />
                <Group justify="flex-end" mt="md">
                    <Button onClick={onClose}>{t('channelsList.modal.cancel')}</Button>
                    <Button type="submit">{titles[mode]}</Button>
                </Group>
            </form>
        }
      </Modal>
    </>
  );
}