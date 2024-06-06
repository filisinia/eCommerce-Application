import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { ICustomerRes } from 'types/customer';

interface ICustomerAuthState {
  customer: ICustomerRes | null;
  error: string | null;
  setCustomer: (customer: ICustomerRes | null) => void;
  setError: (error: string | null) => void;
}

const customerStore = create<ICustomerAuthState>()(
  devtools(
    persist(
      (set) => ({
        customer: null,
        error: null,
        setCustomer: (customer: ICustomerRes | null) => set({ customer }),
        setError: (error: string | null) => set({ error }),
      }),
      { name: 'authCustomer' },
    ),
  ),
);

export default customerStore;
