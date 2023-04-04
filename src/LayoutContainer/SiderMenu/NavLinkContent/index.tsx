import styles from './NavLinkContent.module.scss';
import { theme } from 'antd';

const { useToken } = theme;

interface Props {
  title: string;
  totalCount: number;
}

export const NavLinkContent = ({ title, totalCount }: Props) => {
  const {
    token: { colorTextQuaternary },
  } = useToken();

  return (
    <div className={styles.container}>
      <span>{title}</span>

      <div className={styles.counts}>{!!totalCount && <span style={{ color: colorTextQuaternary }}>{totalCount}</span>}</div>
    </div>
  );
};

export { styles as navLinkContentStyles };
