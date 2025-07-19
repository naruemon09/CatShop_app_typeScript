import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { AuthState } from '../../Interface/IStore';


const Store = create<AuthState>() (
  persist(
    (set) => ({
      token: null,
      username: null,
      setToken: (token) => set({ token }),
      setUsername: (username) => set({ username }),
      logout: () => set({ token: null, username: null }),
    }),
    {
      name: 'auth-storage',
    //   storage: createJSONStorage(() => localStorage)
    }
  )
)

export default Store;

