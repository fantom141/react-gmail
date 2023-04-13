import styles from './styles.module.scss';
import { theme } from 'antd';

const { useToken } = theme;

export const Resizer = () => {
  const {
    token: { colorBorderSecondary, colorPrimaryBorder },
  } = useToken();

  return (
    <div
      className={styles.root}
      data-background="red"
    >
      <div
        className={styles.separator}
        style={{ backgroundColor: colorBorderSecondary }}
      ></div>

      <div
        className={styles.separatorActive}
        style={{ backgroundColor: colorPrimaryBorder }}
      ></div>
    </div>
  );
};
