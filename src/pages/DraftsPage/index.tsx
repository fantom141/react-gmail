import styles from './styles.module.scss';
import { Header } from './Header';
import { useEffect, useRef, useState } from 'react';
import { AppDispatch, getDraftCountRefreshAction } from '@/store';
import { useDispatch } from 'react-redux';
import { DraftPreviewList, DraftPreviewListRef } from './DraftPreviewList';
import { DraftDto, useDraftControllerDeleteDraftMutation } from '@/store/api/draft-api';
import { emitterService } from '@/services';
import { Modal, notification, Typography } from 'antd';
import { NotificationConfig } from '@/configs';

const { Text } = Typography;

export const DraftsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const listRef = useRef<DraftPreviewListRef>();
  const [openedDraft, setOpenedDraft] = useState<DraftDto>();
  const [requestedDraftIdForDelete, setRequestedDraftIdForDelete] = useState<number>();

  const [deleteDraft, { isLoading }] = useDraftControllerDeleteDraftMutation();

  useEffect(() => {
    emitterService.on('DRAFT_CLOSED', draftId => {
      if (openedDraft && openedDraft.draftId === draftId) {
        setOpenedDraft(null);
      }
    });

    emitterService.on('DRAFT_SAVED', draft => {
      if (openedDraft && openedDraft.draftId === draft.draftId) {
        setOpenedDraft(null);
        listRef.current.updateCache(draft);
      }

      if (!openedDraft) {
        listRef.current.refresh();
      }
    });

    return () => {
      emitterService.off('DRAFT_CLOSED');
      emitterService.off('DRAFT_SAVED');
    };
  }, [openedDraft]);

  const prefillToEdit = (draft: DraftDto) => {
    setOpenedDraft(draft);
    emitterService.emit('DRAFT_OPENED', draft);
  };

  const refreshCounts = () => {
    dispatch(getDraftCountRefreshAction());
  };

  const handleDeleteConfirmation = async () => {
    try {
      await deleteDraft({ draftId: requestedDraftIdForDelete }).unwrap();
      notification.success({ message: NotificationConfig.message.DELETED, placement: NotificationConfig.placement });
      setRequestedDraftIdForDelete(null);
      listRef.current.refresh();
      refreshCounts();

      if (openedDraft) {
        emitterService.emit('DRAFT_CLOSED');
      }
    } catch (e) {
      notification.error({ message: NotificationConfig.message.WENT_WRONG, placement: NotificationConfig.placement });
    }
  };

  return (
    <div className={styles.root}>
      <Header />

      <DraftPreviewList
        ref={listRef}
        openedDraftId={openedDraft?.draftId}
        onRefresh={refreshCounts}
        onOpen={prefillToEdit}
        onDelete={setRequestedDraftIdForDelete}
      />

      <Modal
        title="Delete Draft"
        open={!!requestedDraftIdForDelete}
        confirmLoading={isLoading}
        closable={false}
        okText="Confirm"
        onOk={handleDeleteConfirmation}
        onCancel={() => setRequestedDraftIdForDelete(null)}
      >
        <Text>Are you sure to delete this draft?</Text>
      </Modal>
    </div>
  );
};
