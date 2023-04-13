import styles from './styles.module.scss';
import { MessageDetailsProps } from './types';
import { Header } from './Header';
import { Divider, Typography } from 'antd';
import { ContentBlock } from '@/components/ContentBlock';
import classnames from 'classnames';

const { Paragraph, Title } = Typography;

export const MessageDetails = ({ data, isOpened }: MessageDetailsProps) => {
  const subjectClassNames = classnames(styles.subject, {
    [styles.subjectEmpty]: !data.subject,
  });

  return (
    <ContentBlock borderRadius>
      <Header message={data} />

      <Title
        level={3}
        className={subjectClassNames}
      >
        {data.subject || 'No Subject'}
      </Title>

      <Paragraph className={styles.content}>{data.content}</Paragraph>
    </ContentBlock>
  );
};
