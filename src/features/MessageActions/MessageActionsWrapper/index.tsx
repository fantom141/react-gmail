import styles from './styles.module.scss';
import { Space } from 'antd';
import { MessageActionsWrapperProps, MessageActionsWrapperRef } from './types';
import { forwardRef, useImperativeHandle } from 'react';
import classnames from 'classnames';

export const MessageActionsWrapper = forwardRef<MessageActionsWrapperRef, MessageActionsWrapperProps>(({ children, ...rest }, ref) => {
  useImperativeHandle(ref, () => ({
    getItemClassNames: (isDisplayed: boolean) =>
      classnames(styles.item, {
        [styles.itemIsDisplayed]: isDisplayed,
      }),
  }));

  return (
    <Space
      {...rest}
      onClick={e => e.stopPropagation()}
      size={2}
    >
      {children}
    </Space>
  );
});

export type { MessageActionsWrapperRef } from './types';
