import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { io } from "socket.io-client"

export const useChatStore = create(
    persist(
        (set, get) => ({
            channels: {}, // [{1, 'name'}]
            channelsIds: [],
            socket: null,
            activeId: null,
            messagesByChannel: {}, //{1: {1, 'test_message'}}

            setActiveChannel: (id) => set({ activeId: id }),
            loadChannelsList: (list) => set(() => {
                const channels = {}
                const channelsIds = []
                list.forEach(c => {
                    channels[c.id] = c
                    channelsIds.push(c.id)
                })
                return {channels, channelsIds}
            }),
            loadMessages: (list) => set(() => { //list = []
                const messagesByChannel = {}
                list.forEach(m => {
                    messagesByChannel[m.channelId] = messagesByChannel[m.channelId] ?? []
                    messagesByChannel[m.channelId].push(m)
                })
                return { messagesByChannel }
            }),
            addChannel: (channel) => set((state) => ({
                channels: {
                    ...state.channels,
                    [channel.id]: channel
                },
                channelsIds: [
                    ...state.channelsIds,
                    channel.id
                ],
                messagesByChannel: {
                    ...state.messagesByChannel,
                    [channel.id]: []
                }
            })),
            removeChannel: ({ id }) => set((state) => {
                const { channelsIds, activeId } = state;
                
                const oldIndex = channelsIds.indexOf(id);
                
                const newOrder = channelsIds.filter(cId => cId !== id);
                
                let nextId = activeId;

                if (id === activeId) {
                    if (newOrder.length > 0) {

                        const nextCandidate = newOrder[oldIndex]; 
                        const prevCandidate = newOrder[oldIndex - 1];

                        nextId = nextCandidate !== undefined ? nextCandidate : prevCandidate;
                    } else {
                        nextId = null;
                    }
                }

                // 4. Удаляем канал из объекта данных
                const { [id]: _, ...restChannels } = state.channels;
                return {
                    channels: restChannels,
                    channelsIds: newOrder, // <--- ВАЖНО: Сохраняем обновленный список ID!
                    activeId: nextId
                };
            }),
            updateChannel: ({id, name}) => set(state => ({
                channels: {
                    ...state.channels,
                    [id]: { ...state.channels[id], name}
                }
            })),
            addMessage: ({ channelId, body, username, id }) => set((state) => {
                const newMessage = { id, body, username };
                const currentMessages = state.messagesByChannel[channelId] || [];
                if (!currentMessages || currentMessages.some(m => m.id === id)) {
                    return state
                }
                return {
                    messagesByChannel: {
                        ...state.messagesByChannel,
                        [channelId]: [...currentMessages, newMessage]  //
                    }
                };
            }),
            initSocket: () => {
                if (get().socket) return

                const socket = io()
                set({ socket })

                socket.on('newMessage', (data) => get().addMessage(data));
                socket.on('newChannel', (channel) => get().addChannel(channel))
                socket.on('removeChannel', (id) => get().removeChannel(id))
                socket.on('renameChannel', (channel) => get().updateChannel(channel));

            },
            emit: (event, data) => {
                get().socket?.emit(event, data)
            }
        }), 
        {
            name: 'chat-storage',
            storage: createJSONStorage(() => sessionStorage),
            partialize: (state) => ({
                activeId: state.activeId,
                channels: state.channels
            })
        }

    )
)