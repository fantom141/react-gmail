import { useMessageControllerGetCountQuery } from '@/store/api/message-api';
import { getTrashCountQueryArgs } from '@/store';
import { PageHeader } from '@/features/PageHeader';

export const Header = () => {
  const { data: totalCount } = useMessageControllerGetCountQuery(getTrashCountQueryArgs());

  return (
    <PageHeader
      title="Trash"
      totalCount={totalCount}
    />
  );
};
