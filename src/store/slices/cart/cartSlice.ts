import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { ICart } from 'types/cart';

interface ICartStore {
  cart: ICart | null;
  error: string | null;
  setCart: (customer: ICart | null) => void;
  setError: (error: string | null) => void;
}

const cartStore = create<ICartStore>()(
  devtools(
    persist(
      (set) => ({
        cart: null,
        error: null,
        setCart: (cart: ICart | null) => set({ cart }),
        setError: (error: string | null) => set({ error }),
      }),
      { name: 'cart' },
    ),
  ),
);

export default cartStore;
