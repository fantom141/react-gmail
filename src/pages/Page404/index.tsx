import img from '@/assets/404.png';
import styles from './styles.module.scss';
import { Typography } from 'antd';

const { Title, Paragraph } = Typography;

export const Page404 = () => {
  return (
    <div className={styles.root}>
      <img
        src={img}
        alt=""
        className={styles.img}
      />

      <Title
        level={4}
        className={styles.heading}
      >
        Something is wrong
      </Title>

      <Paragraph>The page are looking for was moved, removed, renamed or might never existed!</Paragraph>
    </div>
  );
};
