import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const useAuthStore = create()(
  persist(
    (set) => ({
      token: null,
      user: null,

      setCredentials: (token, username) => {
        set({ token, username })
      },
      
      logout: () => set({ token: null, username: null })
      
    }),
    {
      name: 'auth-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    },
  ),
)

