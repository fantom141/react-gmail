import { HTMLAttributes } from 'react';

export const TextSmaller = ({ ...props }: HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      {...props}
      style={{ fontSize: '13px' }}
    ></span>
  );
};
