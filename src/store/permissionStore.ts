import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PERMISSION_COOKIES_KEY } from '@/lib/constant';
import { cookieStorage } from '@/lib/functions';

interface PermissionState {
  permissions: string[];
  setPermissions: (permissions: string[]) => void;
  hasPermission: (permission: string) => boolean;
}

export const usePermissionStore = create<PermissionState>()(
  persist(
    (set, get) => ({
      permissions: [],

      setPermissions: (permissions) => {
        set({ permissions });
      },

      hasPermission: (permission) => {
        const state = get();
        return state.permissions.includes(permission);
      },
    }),
    {
      name: PERMISSION_COOKIES_KEY,
      storage: cookieStorage,
      partialize: (state) => ({
        permissions: state.permissions,
      }),
    }
  )
);
