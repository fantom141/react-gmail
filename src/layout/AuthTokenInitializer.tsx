import { PropsWithChildren, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, authTokenSelector, syncAuthState } from '@/store';
import { AppLoading } from '@/components';

export const AuthTokenInitializer = ({ children }: PropsWithChildren) => {
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector(authTokenSelector);

  useEffect(() => {
    dispatch(syncAuthState(false));
  }, [dispatch]);

  return !token ? <AppLoading /> : <>{children}</>;
};
