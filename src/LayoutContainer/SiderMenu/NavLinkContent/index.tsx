import styles from './styles.module.scss';
import { theme } from 'antd';
import { NavLinkContentProps } from './types';

const { useToken } = theme;

export const NavLinkContent = ({ title, totalCount }: NavLinkContentProps) => {
  const {
    token: { colorTextTertiary: color },
  } = useToken();

  return (
    <div className={styles.root}>
      <span>{title}</span>

      <div className={styles.counts}>{!!totalCount && <span style={{ color }}>{totalCount}</span>}</div>
    </div>
  );
};

export { styles as navLinkContentStyles };
