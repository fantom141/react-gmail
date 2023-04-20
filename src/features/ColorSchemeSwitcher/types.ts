import { SizeType } from 'antd/lib/config-provider/SizeContext';
import { HTMLAttributes } from 'react';

export interface ColorSchemeProps extends HTMLAttributes<HTMLDivElement> {
  size?: SizeType;
}
