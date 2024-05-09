import { create } from 'zustand';

export type BearsState = {
  bears: number;
  increasePopulation: () => void;
  removeAllBears: () => void;
};

export const useStore = create<BearsState>((set) => ({
  bears: 0,
  increasePopulation: () => set((state: BearsState) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}));
