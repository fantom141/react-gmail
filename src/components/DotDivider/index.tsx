import styles from './styles.module.scss';
import { theme } from 'antd';

const { useToken } = theme;

export const DotDivider = () => {
  const {
    token: { colorTextTertiary: backgroundColor },
  } = useToken();

  return (
    <span className={styles.root}>
      <div
        className={styles.divider}
        style={{ backgroundColor }}
      ></div>
    </span>
  );
};
