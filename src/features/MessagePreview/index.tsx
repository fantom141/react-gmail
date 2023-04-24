import styles from './styles.module.scss';
import classnames from 'classnames';
import { MessagePreviewProps } from './types';
import { Preview } from '@/features/Preview';

export const MessagePreview = ({ data, isOpened, renderActionsElement, ...restProps }: MessagePreviewProps) => {
  const { subject, content, sender, createdAt, isRead } = data;

  const rootClassNames = classnames(styles.root, {
    [styles.unread]: !isRead,
  });

  return (
    <Preview
      {...restProps}
      subject={subject}
      content={content}
      createdAt={createdAt}
      firstName={sender.firstName}
      lastName={sender.lastName}
      email={sender.email}
      isOpened={isOpened}
      renderActionsElement={renderActionsElement}
      className={rootClassNames}
    />
  );
};
