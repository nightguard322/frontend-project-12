import { TextInput, Group, Button } from '@mantine/core';
import { Modal } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useTranslation } from 'react-i18next';
import { notifications } from '@mantine/notifications';

export const EntityFormModal = ({ 
    opened,
    onClose,
    mode,
    handleSubmit,
    channelId = null,
    channelTitle = '',
    channelsList
    }) => {

    const titles = {
        createChannel: 'create',
        updateChannel: 'update'
    }
    const { t } = useTranslation();

    const form = useForm({
        initialValues: {
            name: channelTitle ?? ''
        },
        validate: {
            name: (value) => {
                if (!value.trim()) return t('errors.emptyName');
                if (channelsList.some(c => c.name === value)) {
                    return t('errors.uniqueName');
                }
            }
        }
    })
  return (
    <>
      <Modal opened={opened} onClose={onClose} title={titles[mode]} centered>
                <form onSubmit={form.onSubmit((values) => {
                    notifications.show({
                        title: t(`channelsList.${titles[mode]}.message`),
                        color: 'green',
                    });
                    handleSubmit(
                        {
                            cData: { name: values.name},
                            id: channelId
                        }, mode)
                })}>
                <TextInput
                    {...form.getInputProps('name')}
                  label={t(`channelsList.${titles[mode]}.title`)}
                  >
                </TextInput>
                <Group justify="flex-end" mt="md">
                    <Button onClick={onClose}>Отмена</Button>
                    <Button type="submit">Отправить</Button>
                </Group>
            </form>
      </Modal>
    </>
  );
}