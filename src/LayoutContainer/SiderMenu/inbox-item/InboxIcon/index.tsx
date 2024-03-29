import styles from './styles.module.scss';
import { MailOutlined } from '@ant-design/icons';
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { useMessageControllerGetCountQuery } from '@/store/api/message-api';
import { getUnreadCountQueryArgs } from '@/store';
import { InboxIconProps } from './types';

export const InboxIcon = ({ collapsed }: InboxIconProps) => {
  const { user } = useContext(AuthContext);
  const { data: unreadCount } = useMessageControllerGetCountQuery(getUnreadCountQueryArgs(user.email));

  const badgeIsShown = collapsed && !!unreadCount;

  return <MailOutlined className={`${badgeIsShown ? styles.withBadge : ''}`} />;
};
