import { create } from 'zustand';

type breadcrumb = {
  name: string;
  path: string;
};

interface menuState {
  menu: breadcrumb[];
  setMenu: (menu: breadcrumb[]) => void;
}

const useMenuStore = create<menuState>((set) => ({
  menu: [],
  setMenu: (menu) => set({ menu }),
}));

export default useMenuStore;
