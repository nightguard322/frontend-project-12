import create from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export default useChatStore = create()(
    persist(
        (set) => ({
            channels: [], // [{1, 'name'}]
            activeChannelId: null,
            messagesByChannel: {}, //{1: {1, 'test_message'}}

            setActiveChannel: (id) => set({ activeChannelId: id }),
            addChannel: (channelId, name) => set((state) => {
                channels: [...state.channels, { channelId, name }]
            }),
            addMessage: (channelId, msg) => set((state) => {
                 messagesByChannel: ({
                    ...state.messagesByChannel,
                    [channelId]: [
                        ...state.messagesByChannel[channelId] || [],
                        msg
                    ]
                })
            })
        }),
        {
            name: 'chat-storage',
            storage: createJSONStorage(() => sessionStorage),
            partialize: (state) => ({
                activeChannelId: state.activeChannelId,
                channels: state.channels
            })
        }

    )
)