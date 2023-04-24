import { DraftPreviewProps } from './types';
import { Preview } from '@/features/Preview';

export const DraftPreview = ({ data, isOpened, renderActionsElement, ...restProps }: DraftPreviewProps) => {
  const { subject, content, createdAt } = data;

  return (
    <Preview
      {...restProps}
      subject={subject}
      content={content}
      createdAt={createdAt}
      isOpened={isOpened}
      renderActionsElement={renderActionsElement}
    />
  );
};
