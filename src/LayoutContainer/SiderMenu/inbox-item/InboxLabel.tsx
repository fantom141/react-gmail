import { NavLink } from 'react-router-dom';
import { NavLinkContent, navLinkContentStyles } from '../NavLinkContent';
import styles from './InboxLabel.module.scss';
import { SiderMenuLabelProps } from '../SiderMenu.types';
import { theme } from 'antd';
import { useMessageControllerGetCountQuery } from '@/store/api/message-api';
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { getInboxCountStoreQueryArgs, getUnreadCountStoreQueryArgs } from '@/utils';

const { useToken } = theme;

export const InboxLabel = ({ path }: SiderMenuLabelProps) => {
  const title = 'Inbox';

  const {
    token: { colorError, colorBgBase, borderRadius, colorTextQuaternary },
  } = useToken();

  const { user } = useContext(AuthContext);

  const { data: totalCount } = useMessageControllerGetCountQuery(getInboxCountStoreQueryArgs(user.email));
  const { data: unreadCount } = useMessageControllerGetCountQuery(getUnreadCountStoreQueryArgs(user.email));

  return (
    <NavLink to={path}>
      {!unreadCount ? (
        <NavLinkContent
          title={title}
          totalCount={totalCount}
        />
      ) : (
        <div className={navLinkContentStyles.container}>
          <span>Inbox</span>

          <div className={`${navLinkContentStyles.counts} ${styles.counts}`}>
            <span>
              <span
                style={{ backgroundColor: colorError, color: colorBgBase, borderRadius }}
                className={styles.unread}
              >
                {unreadCount}
              </span>
            </span>
            <span style={{ color: colorTextQuaternary }}>{totalCount}</span>
          </div>
        </div>
      )}
    </NavLink>
  );
};
