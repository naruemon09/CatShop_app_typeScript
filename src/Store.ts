import { create } from 'zustand'
import type { AuthState } from './Interface/IAuth';

export const useAuthStore = create<AuthState>((set) => ({
    token: null,
    setToken: (token) => set({ token }),
    logout: () => set({ token: null }),
}));