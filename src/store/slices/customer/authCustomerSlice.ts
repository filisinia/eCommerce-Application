import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { ICustomer } from 'types/customer';

interface ICustomerAuthState {
  customer: ICustomer | null;
  error: string | null;
  setCustomer: (user: ICustomer) => void;
  setError: (error: string) => void;
}

const authCustomerStore = create<ICustomerAuthState>()(
  devtools(
    persist(
      (set) => ({
        customer: null,
        error: null,
        setCustomer: (customer: ICustomer) => set({ customer }),
        setError: (error: string) => set({ error }),
      }),
      { name: 'authCustomer' },
    ),
  ),
);

export default authCustomerStore;
