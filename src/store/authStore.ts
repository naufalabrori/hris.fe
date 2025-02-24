import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types/User/type';
import { USER_COOKIES_KEY } from '@/lib/constant';
import { cookieStorage } from '@/lib/functions';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  login: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      setUser: (user) => set({ user }),

      login: (user) => {
        set({
          user,
          isAuthenticated: true,
        });
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: USER_COOKIES_KEY,
      storage: cookieStorage,
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
