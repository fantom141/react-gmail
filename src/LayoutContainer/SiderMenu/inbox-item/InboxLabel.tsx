import { NavLink } from 'react-router-dom';
import { NavLinkContent, navLinkContentStyles } from '../NavLinkContent';
import styles from './InboxLabel.module.scss';
import { SiderMenuLabelProps } from '../types';
import { theme } from 'antd';
import { useMessageControllerGetCountQuery } from '@/store/api/message-api';
import { useContext, useMemo } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { getInboxCountStoreQueryArgs, getUnreadCountStoreQueryArgs } from '@/utils';

const { useToken } = theme;

export const InboxLabel = ({ path }: SiderMenuLabelProps) => {
  const title = 'Inbox';
  const maxUnreadDisplayed = 99;

  const {
    token: { colorError: unreadColor, colorBgBase, borderRadius, colorTextTertiary: totalColor },
  } = useToken();

  const { user } = useContext(AuthContext);

  const { data: totalCount } = useMessageControllerGetCountQuery(getInboxCountStoreQueryArgs(user.email));
  const { data: unreadCount } = useMessageControllerGetCountQuery(getUnreadCountStoreQueryArgs(user.email));

  const unreadCountDisplayed = useMemo(
    () => (unreadCount && unreadCount > maxUnreadDisplayed ? `${maxUnreadDisplayed}+` : unreadCount),
    [unreadCount]
  );

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
                style={{ backgroundColor: unreadColor, color: colorBgBase, borderRadius }}
                className={styles.unread}
              >
                {unreadCountDisplayed}
              </span>
            </span>
            <span style={{ color: totalColor }}>{totalCount}</span>
          </div>
        </div>
      )}
    </NavLink>
  );
};
