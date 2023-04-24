import { getDraftsCountQueryArgs } from '@/store';
import { PageHeader } from '@/features/PageHeader';
import { useDraftControllerGetCountQuery } from '@/store/api/draft-api';

export const Header = () => {
  const { data: totalCount } = useDraftControllerGetCountQuery(getDraftsCountQueryArgs());

  return (
    <PageHeader
      title="Drafts"
      totalCount={totalCount}
    />
  );
};
