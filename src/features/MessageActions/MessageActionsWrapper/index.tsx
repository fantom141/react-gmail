import styles from './styles.module.scss';
import { Space } from 'antd';
import { MessageActionsWrapperProps } from './types';
import classnames from 'classnames';

export const MessageActionsWrapper = ({ children, ...rest }: MessageActionsWrapperProps) => {
  return (
    <Space
      {...rest}
      onClick={e => e.stopPropagation()}
      size={2}
    >
      {children}
    </Space>
  );
};

export const getActionItemClassNames = (isDisplayed: boolean) =>
  classnames(styles.item, {
    [styles.itemIsDisplayed]: isDisplayed,
  });
