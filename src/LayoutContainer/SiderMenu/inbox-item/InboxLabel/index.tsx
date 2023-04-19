import { NavLink } from 'react-router-dom';
import { NavLinkContent, navLinkContentStyles } from '../../NavLinkContent';
import styles from './styles.module.scss';
import { SiderMenuLabelProps } from '../../types';
import { theme } from 'antd';
import { useMessageControllerGetCountQuery } from '@/store/api/message-api';
import { useContext, useMemo } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { getInboxCountQueryArgs, getUnreadCountQueryArgs } from '@/store';

const { useToken } = theme;
const title = 'Inbox';
const maxUnreadDisplayed = 99;

export const InboxLabel = ({ path }: SiderMenuLabelProps) => {
  const {
    token: { colorError: unreadColor, colorBgBase, borderRadius, colorTextTertiary: totalColor },
  } = useToken();

  const { user } = useContext(AuthContext);

  const { data: totalCount } = useMessageControllerGetCountQuery(getInboxCountQueryArgs(user.email));
  const { data: unreadCount } = useMessageControllerGetCountQuery(getUnreadCountQueryArgs(user.email));

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
        <div className={navLinkContentStyles.root}>
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
