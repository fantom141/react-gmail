import { baseApi as api } from './base-api';
const injectedRtkApi = api.injectEndpoints({
  endpoints: build => ({
    draftControllerGetDrafts: build.query<DraftControllerGetDraftsApiResponse, DraftControllerGetDraftsApiArg>({
      query: queryArg => ({
        url: `/drafts`,
        params: { search: queryArg.search, page: queryArg.page, size: queryArg.size, sort: queryArg.sort },
      }),
    }),
    draftControllerCreateDraft: build.mutation<DraftControllerCreateDraftApiResponse, DraftControllerCreateDraftApiArg>({
      query: queryArg => ({ url: `/drafts`, method: 'POST', body: queryArg.upsertDraftDto }),
    }),
    draftControllerUpdateDraft: build.mutation<DraftControllerUpdateDraftApiResponse, DraftControllerUpdateDraftApiArg>({
      query: queryArg => ({ url: `/drafts/${queryArg.draftId}`, method: 'PUT', body: queryArg.upsertDraftDto }),
    }),
    draftControllerDeleteDraft: build.mutation<DraftControllerDeleteDraftApiResponse, DraftControllerDeleteDraftApiArg>({
      query: queryArg => ({ url: `/drafts/${queryArg.draftId}`, method: 'DELETE' }),
    }),
    draftControllerGetCount: build.query<DraftControllerGetCountApiResponse, DraftControllerGetCountApiArg>({
      query: () => ({ url: `/drafts/count` }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as enhancedApi };
export type DraftControllerGetDraftsApiResponse = /** status 200  */ DraftPageResDto;
export type DraftControllerGetDraftsApiArg = {
  search?: string;
  page?: number;
  /** "-1" to get all */
  size?: number;
  sort?: string[];
};
export type DraftControllerCreateDraftApiResponse = /** status 201  */ DraftDto;
export type DraftControllerCreateDraftApiArg = {
  upsertDraftDto: UpsertDraftDto;
};
export type DraftControllerUpdateDraftApiResponse = /** status 200  */ DraftDto;
export type DraftControllerUpdateDraftApiArg = {
  draftId: number;
  upsertDraftDto: UpsertDraftDto;
};
export type DraftControllerDeleteDraftApiResponse = /** status 200  */ DraftDto;
export type DraftControllerDeleteDraftApiArg = {
  draftId: number;
};
export type DraftControllerGetCountApiResponse = /** status 200  */ number;
export type DraftControllerGetCountApiArg = void;
export type DraftDto = {
  draftId: number;
  email?: string;
  subject?: string;
  content?: string;
  createdAt: string;
};
export type DraftPageResDto = {
  content: DraftDto[];
  empty: boolean;
  first: boolean;
  last: boolean;
  page: number;
  numberOfElements: number;
  size: number;
  sort: string[];
  totalElements: number;
  totalPages: number;
};
export type UpsertDraftDto = {
  email?: string;
  subject?: string;
  content?: string;
};
export const {
  useDraftControllerGetDraftsQuery,
  useLazyDraftControllerGetDraftsQuery,
  useDraftControllerCreateDraftMutation,
  useDraftControllerUpdateDraftMutation,
  useDraftControllerDeleteDraftMutation,
  useDraftControllerGetCountQuery,
  useLazyDraftControllerGetCountQuery,
} = injectedRtkApi;
