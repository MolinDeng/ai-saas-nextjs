import { create } from 'zustand';

interface useSubWindowProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useSubWindowStore = create<useSubWindowProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
