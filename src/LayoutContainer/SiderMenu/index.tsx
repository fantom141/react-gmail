import styles from './styles.module.scss';
import { Menu } from 'antd';
import { useLocation } from 'react-router-dom';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import { inboxItem } from './inbox-item';
import { sentItem } from './sent-item';
import { draftsItem } from './drafts-item';
import { favouritesItem } from './favourites-item';
import { spamItem } from './spam-item';
import { trashItem } from './trash-item';
import { SiderMenuProps } from './types';

export const SiderMenu = ({ collapsed }: SiderMenuProps) => {
  const location = useLocation();
  const items: ItemType[] = [inboxItem(collapsed), sentItem, draftsItem, favouritesItem, spamItem, trashItem];
  const selectedKey = items.find(({ key }) => location.pathname.split('/').filter(Boolean)[0] === key)?.key as string;

  return (
    <div className={styles.root}>
      <Menu
        items={items}
        selectedKeys={selectedKey ? [selectedKey] : null}
      />
    </div>
  );
};
