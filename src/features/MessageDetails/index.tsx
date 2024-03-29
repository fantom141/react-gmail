import styles from './styles.module.scss';
import { MessageDetailsProps } from './types';
import { Header } from './Header';
import { Typography } from 'antd';
import { ContentBlock } from '@/components/ContentBlock';
import classnames from 'classnames';

const { Paragraph, Title } = Typography;

export const MessageDetails = ({ data, isOpened, renderActionsElement }: MessageDetailsProps) => {
  const subjectClassNames = classnames(styles.subject, {
    [styles.subjectEmpty]: !data.subject,
  });

  return (
    <ContentBlock
      borderRadius
      id={`${data.messageId}`}
    >
      <Header
        message={data}
        actionsElement={renderActionsElement}
      />

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
