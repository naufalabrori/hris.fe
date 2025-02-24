import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AUTH_COOKIES_KEY } from '@/lib/constant';
import { cookieStorage } from '@/lib/functions';

interface AuthState {
  token: string | null;
  setToken: (token: string | null) => void;
}

export const useTokenStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,

      setToken: (token) => {
        set({ token });
      },
    }),
    {
      name: AUTH_COOKIES_KEY,
      storage: cookieStorage,
      partialize: (state) => ({
        token: state.token,
      }),
    }
  )
);
