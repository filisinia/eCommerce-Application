import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { ICustomer } from 'types/customer';

interface ICustomerAuthState {
  customer: ICustomer | null;
  error: string | null;
  setCustomer: (customer: ICustomer | null) => void;
  setError: (error: string | null) => void;
}

const authCustomerStore = create<ICustomerAuthState>()(
  devtools(
    persist(
      (set) => ({
        customer: null,
        error: null,
        setCustomer: (customer: ICustomer | null) => set({ customer }),
        setError: (error: string | null) => set({ error }),
      }),
      { name: 'authCustomer' },
    ),
  ),
);

export default authCustomerStore;
