import { Menu } from 'antd';
import { NavLink, useLocation } from 'react-router-dom';
import { MailOutlined, InboxOutlined, SendOutlined } from '@ant-design/icons';
import { ItemType } from 'antd/es/menu/hooks/useItems';

const items: ItemType[] = [
  {
    label: <NavLink to={`inbox`}>Inbox</NavLink>,
    key: 'inbox',
    icon: <MailOutlined />,
    title: null,
  },
  {
    label: <NavLink to={`sent`}>Sent</NavLink>,
    key: 'sent',
    icon: <SendOutlined />,
    title: null,
  },
];

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
