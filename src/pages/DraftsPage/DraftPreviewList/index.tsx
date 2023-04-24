import { MessagePreviewListSkeleton } from '@/features/MessagePreviewListSkeleton';
import { MessageListActions } from '@/features/MessageListActions';
import { MessageListEmpty } from '@/features/MessageListEmpty';
import { Scrollable } from '@/components/Scrollable';
import { forwardRef, useEffect, useImperativeHandle, useMemo } from 'react';
import { DraftPreviewListProps, DraftPreviewListRef } from './types';
import { DraftControllerGetDraftsApiArg, DraftDto, useLazyDraftControllerGetDraftsQuery } from '@/store/api/draft-api';
import { getListPatchAction, getPredefinedReqArgs } from './utils';
import { Filter } from '../Filter';
import { List } from 'antd';
import { DraftPreview } from '@/pages/DraftsPage/DraftPreview';
import { DraftPreviewActions } from '@/pages/DraftsPage/DraftPreviewActions';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';

export const DraftPreviewList = forwardRef<DraftPreviewListRef, DraftPreviewListProps>(
  ({ openedDraftId, onRefresh, onOpen, onDelete }, ref) => {
    const predefineReqArgs = useMemo(() => getPredefinedReqArgs(), []);
    const [getDrafts, { data: draftsRes, isFetching, originalArgs }] = useLazyDraftControllerGetDraftsQuery();
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
      getDrafts(predefineReqArgs);
    }, []);

    useImperativeHandle(ref, () => ({
      refresh: (): void => {
        refresh();
      },
      updateCache: (draft: DraftDto) => {
        dispatch(getListPatchAction(draft, originalArgs));
      },
    }));

    const applyFilter = (values: DraftControllerGetDraftsApiArg) => {
      getDrafts({ ...predefineReqArgs, ...originalArgs, page: 0, ...values });
    };

    const refresh = () => {
      getDrafts(originalArgs);
      onRefresh();
    };

    return (
      <>
        <>
          <Filter onChange={applyFilter} />

          {isFetching || !draftsRes?.content ? (
            <MessagePreviewListSkeleton />
          ) : (
            <>
              <MessageListActions
                totalEntries={draftsRes.totalElements}
                currentPage={draftsRes.page}
                pageSize={draftsRes.size}
                sort={draftsRes.sort}
                onPaginate={(page, size) => getDrafts({ ...originalArgs, page, size })}
                onChangeSort={val => getDrafts({ ...originalArgs, sort: val })}
                onRefresh={refresh}
              />

              {!draftsRes.content.length ? (
                <MessageListEmpty />
              ) : (
                <Scrollable maxHeight="calc(100vh - 12.875rem)">
                  <List
                    itemLayout="horizontal"
                    dataSource={draftsRes.content}
                    renderItem={item => (
                      <DraftPreview
                        data={item}
                        isOpened={item.draftId === openedDraftId}
                        onClick={() => onOpen(item)}
                        renderActionsElement={cursorOver => (
                          <DraftPreviewActions
                            isDisplayed={cursorOver}
                            onDelete={() => onDelete(item.draftId)}
                          />
                        )}
                      />
                    )}
                  ></List>
                </Scrollable>
              )}
            </>
          )}
        </>
      </>
    );
  }
);

export type { DraftPreviewListRef };
