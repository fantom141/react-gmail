import { DraftDto } from '@/store/api/draft-api';

export interface DraftPreviewListProps {
  openedDraftId: number;
  onRefresh: () => void;
  onOpen: (draft: DraftDto) => void;
  onDelete: (draftId: number) => void;
}

export interface DraftPreviewListRef {
  refresh: () => void;
  updateCache: (draft: DraftDto) => void;
}
