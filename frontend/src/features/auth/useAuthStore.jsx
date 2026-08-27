import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const useAuthStore = create()(
  persist(
    (set) => ({
      token: null,
      user: null,
      setCredentials: () => {
        useMutation
      },
    }),
    {
      name: 'food-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    },
  ),
)






    // login: () => {
    //     return useMutation({
    //         mutationFn: async (userData) => {
    //             const { data } = axios.post('/api/v1/login', userData)
    //         }
    //     })
    // }

    // login: (userData) => {
    // localStorage.setItem('token', userData.token);
    // set({ token: userData.token, user: userData.user });

