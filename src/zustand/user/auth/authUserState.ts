import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { IUserAuthState } from '../../types/userType';

const authUserStore = create<IUserAuthState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
      }),
      { name: 'authUser' },
    ),
  ),
);

export default authUserStore;
