import { DraftControllerGetDraftsApiArg, DraftDto, enhancedApi as draftApi } from '@/store/api/draft-api';

export const getPredefinedReqArgs = (): DraftControllerGetDraftsApiArg => ({
  page: 0,
  size: 20,
  sort: ['createdAt,desc'],
});

export const getListPatchAction = (updatedDraft: DraftDto, args: DraftControllerGetDraftsApiArg) =>
  draftApi.util.updateQueryData('draftControllerGetDrafts', args, draft => {
    draft.content = draft.content.map(el => {
      if (el.draftId === updatedDraft.draftId) {
        return updatedDraft;
      }

      return el;
    });
  });
