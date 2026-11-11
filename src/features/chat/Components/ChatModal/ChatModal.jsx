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

    const form = useForm({
        onSubmitPreventDefault: 'always',
        initialValues: {
            title: '',
        },
        validate: {
            title: (value) => {
                if (!value || value.length === 0) return t('errors.register.name'); 
                if (value.length <= 3 || value.length >= 20) return t('errors.register.name');
                return null;
            },
        }
    })


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
                form.onSubmit((values) => {
                    const filteredTitle = filter.clean(values.title); 
                    handleSubmit({ cData: { name: filteredTitle }, id: channelId }, mode);
                }
            )}>
                <TextInput
                    label="Имя канала"
                    placeholder="channel name"
                    {...form.getInputProps('title')} 
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