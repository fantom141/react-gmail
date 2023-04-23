import { useMessageControllerGetCountQuery } from '@/store/api/message-api';
import { getFavouritesCountQueryArgs } from '@/store';
import { PageHeader } from '@/features/PageHeader';

export const Header = () => {
  const { data: totalCount } = useMessageControllerGetCountQuery(getFavouritesCountQueryArgs());

  return (
    <PageHeader
      title="Favourites"
      totalCount={totalCount}
    />
  );
};
