import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useChatStore = create(
    persist(
        (set) => ({
            channels: {}, // [{1, 'name'}]
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
            updateChannel: (id, data) => set(state => ({
                channels: {
                    ...state.channels,
                    [id]: {...state.channels[id], data}
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