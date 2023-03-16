import { createContext, PropsWithChildren } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { FIREBASE_AUTH } from '@/firebase';
import { User } from 'firebase/auth';

export interface IAuthContext {
  user: User;
  loading: boolean;
  error: Error;
}

export const AuthContext = createContext<IAuthContext>(null);

export const AuthContextProvider = (props: PropsWithChildren) => {
  const [user, loading, error] = useAuthState(FIREBASE_AUTH);

  return <AuthContext.Provider value={{ user, loading, error }}>{props.children}</AuthContext.Provider>;
};
