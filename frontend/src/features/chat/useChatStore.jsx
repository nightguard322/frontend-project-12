import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useChatStore = create(
    persist(
        (set, get) => ({
            channels: {}, // [{1, 'name'}]
            channelsIds: [],
            socket: null,
            activeId: null,
            messagesByChannel: {}, //{1: {1, 'test_message'}}

            setActiveChannel: (id) => set({ activeId: id }),
            addChannel: (channel) => set((state) => ({
                channels: {
                    ...state.channels,
                    [channel.id]: channel
                },
                channelsIds: [
                    ...state.channelsIds,
                    channel.id
                ]
            })),
            removeChannel: ({id}) => set(state => {
                const idIndex = state.channelsIds.indexOf(id)
                const newOrder = state.channelsIds.filter(cId => cId !== id)
                let nextId = state.activeId
                if (id === state.activeId) {
                    if (newOrder.length > 0) {
                        nextId = newOrder[idIndex] || newOrder[idIndex - 1]
                        console.log('next', newOrder[idIndex], 'bfeor', newOrder[idIndex - 1])
                    } else {
                        nextId = null
                    }
                }

                console.log('setting active channel id', nextId)
                const {[id]: _, ...rest} = state.channels
                return {
                    channels: rest,
                    activeId: nextId
                }
            }),
            updateChannel: ({id, name}) => set(state => ({
                channels: {
                    ...state.channels,
                    [id]: { ...state.channels[id], name}
                }
            })),
            addMessage: ({channelId, body, username, id}) => set((state) => {
                const message = {id, body, username} 
                return {    
                        messagesByChannel: ({
                            ...state.messagesByChannel,
                            [channelId]: {
                                ...state.messagesByChannel[channelId],
                                message
                            }
                    })
                }
            }),
            initSocket: () => {
                if (get().socket) return

                const socket = io('http://0.0.0.0:5001')
                set({ socket })

                socket.on('newMessage', ({channelId, body}) => get().addMessage(channelId, body));
                socket.on('newChannel', (channel) => get().addChannel(channel))
                socket.on('removeChannel', ({ id }) => get().removeChannel(id))
                socket.on('renameChannel', ({ id, name }) => get().updateChannel(id,name));

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