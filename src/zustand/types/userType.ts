import { IUser } from '../../types/user';

export interface IUserAuthState {
  user: IUser | null;
  error: string | null;
  setUser: (user: IUser) => void;
  setError: (error: string) => void;
}
