import { useMessageControllerGetCountQuery } from '@/store/api/message-api';
import { getSpamCountQueryArgs } from '@/store';
import { PageHeader } from '@/features/PageHeader';

export const Header = () => {
  const { data: totalCount } = useMessageControllerGetCountQuery(getSpamCountQueryArgs());

  return (
    <PageHeader
      title="Spam"
      totalCount={totalCount}
    />
  );
};
