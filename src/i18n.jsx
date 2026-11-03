import i18n from 'i18next'
import { initReactI18next } from 'react-i18next';

const resources = {
    en: {
        translation: {
            common: {
                loading: 'Loading...'
            },
            channelsList: {
                create: {
                    title: 'Create channel',
                    message: 'Successfully created'
                },
                update: {
                    title: 'Update channel',
                    message: 'Successfully updated'
                },
                delete: {
                    title: 'Delete channel',
                    message: 'Successfully removed',
                    confirmationQ: 'Are you sure?',
                },
                cancel: 'Cancel',
            }
        }
    },
    ru: {
        translation: {
            common: {
                loading: 'Загрузка...'
            },
            channelsList: {
                create: {
                    title: 'Добавить канал',
                    message: 'Канал создан'
                },
                update: {
                    title: 'Переименовать канал',
                    message: 'Канал переименован'
                },
                delete: {
                    title: 'Удалить канал',
                    message: 'Канал удален',
                    confirmationQ: 'Are you sure?',
                },
                cancel: 'Cancel',
            },
            errors: {
                'uniqueName': 'Имя должно быть уникальным',
                'empty': 'Имя не должно быть пустым',
                'cannot_delete': "Невозможно удалить этот канал",
                'channel_locked': 'Этот канал защищен от удаления'
            }
        }
    },
}

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: 'ru',
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        }
    })

export default i18n