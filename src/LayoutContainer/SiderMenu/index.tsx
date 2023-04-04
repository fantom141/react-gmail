import { Menu } from 'antd';
import { useLocation } from 'react-router-dom';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import { inboxItem } from './inbox-item';
import { sentItem } from './sent-item';
import { draftsItem } from './drafts-item';
import { favouritesItem } from './favourites-item';
import { spamItem } from './spam-item';
import { trashItem } from './trash-item';

const items: ItemType[] = [inboxItem, sentItem, draftsItem, favouritesItem, spamItem, trashItem];

export const SiderMenu = () => {
  const location = useLocation();
  const selectedKey = items.find(({ key }) => location.pathname.includes(key as string))?.key as string;

  return (
    <Menu
      items={items}
      selectedKeys={selectedKey ? [selectedKey] : null}
    />
  );
};
