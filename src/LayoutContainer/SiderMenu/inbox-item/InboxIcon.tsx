import styles from './InboxIcon.module.scss';
import { MailOutlined } from '@ant-design/icons';
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { useMessageControllerGetCountQuery } from '@/store/api/message-api';
import { getUnreadCountStoreQueryArgs } from '@/utils';

interface Props {
  collapsed: boolean;
}

export const InboxIcon = ({ collapsed }: Props) => {
  const { user } = useContext(AuthContext);
  const { data: unreadCount } = useMessageControllerGetCountQuery(getUnreadCountStoreQueryArgs(user.email));

  const badgeIsShown = collapsed && !!unreadCount;

  return <MailOutlined className={`${badgeIsShown ? styles.withBadge : ''}`} />;
};
