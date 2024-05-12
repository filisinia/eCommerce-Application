import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { IUser } from '../../../types/user';
import { IUserAuthState } from '../../types/userType';

const authUserStore = create<IUserAuthState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        error: null,
        setUser: (user: IUser) => set({ user }),
        setError: (error: string) => set({ error }),
      }),
      { name: 'authUser' },
    ),
  ),
);

export default authUserStore;
