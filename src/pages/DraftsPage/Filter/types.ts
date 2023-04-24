import { Dayjs } from 'dayjs';
import { DraftControllerGetDraftsApiArg } from '@/store/api/draft-api';

export interface FilterProps {
  onChange: (data: DraftControllerGetDraftsApiArg) => void;
}

export interface DraftsFilterValues {
  search: string;
}
