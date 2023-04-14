import { PropsWithChildren } from 'react';

interface Props {
  successFn: () => void;
}
export interface LoginFormProps extends PropsWithChildren<Props> {}

export interface LoginFormValues {
  email: string;
  password: string;
}
