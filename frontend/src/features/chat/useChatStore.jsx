import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useChatStore = create(
    persist(
        (set, get) => ({
            channels: {}, // [{1, 'name'}]
            socket: null,
            activeId: null,
            messagesByChannel: {}, //{1: {1, 'test_message'}}

            setActiveChannel: (id) => set({ activeId: id }),
            addChannel: (channel) => set((state) => ({
                channels: {
                    ...state.channels,
                    [channel.id]: channel
                }
            })),
            removeChannel: ({id}) => set(state => {
                const {[id]: _, ...rest} = state.channels
                return {
                    channels: rest,
                    activeId: state.activeId === id ? null: state.activeId
                }
            }),
            updateChannel: ({id, name}) => set(state => ({
                channels: {
                    ...state.channels,
                    [id]: { ...state.channels[id], name}
                }
            })),
            addMessage: (id, msg) => set((state) => ({
                 messagesByChannel: ({
                    ...state.messagesByChannel,
                    [id]: [
                        ...state.messagesByChannel[id] || [],
                        msg
                    ]
                })
            })),
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