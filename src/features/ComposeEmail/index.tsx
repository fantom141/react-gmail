import styles from './styles.module.scss';
import { useContext, useEffect, useState } from 'react';
import { Button, Card, notification } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { Form } from './Form';
import { ComposeEmailFormValues, ComposeEmailProps, SaveAsDraftFormValues } from './types';
import { useMessageControllerCreateMessageMutation } from '@/store/api/message-api';
import { DraftDto, useDraftControllerCreateDraftMutation, useDraftControllerUpdateDraftMutation } from '@/store/api/draft-api';
import { useDispatch } from 'react-redux';
import { AppDispatch, getDraftCountRefreshAction, getSentCountRefreshAction } from '@/store';
import { AuthContext } from '@/context/AuthContext';
import { NotificationConfig } from '@/configs';
import { emitterService } from '@/services';

export const ComposeEmail = ({ className, ...restProps }: ComposeEmailProps) => {
  const [isOpened, setIsOpened] = useState<boolean>();
  const [openedDraft, setOpenedDraft] = useState<DraftDto>();
  const [sendMessage, { isLoading: sendIsLoading }] = useMessageControllerCreateMessageMutation();
  const [createDraft, { isLoading: createDraftIsLoading }] = useDraftControllerCreateDraftMutation();
  const [updateDraft, { isLoading: updateDraftIsLoading }] = useDraftControllerUpdateDraftMutation();

  const { user } = useContext(AuthContext);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    emitterService.on('COMPOSE_OPENED', () => setIsOpened(true));
    emitterService.on('DRAFT_OPENED', draft => {
      setIsOpened(true);
      setOpenedDraft(draft);
    });
    emitterService.on('DRAFT_CLOSED', () => setOpenedDraft(null));

    return () => {
      emitterService.off('COMPOSE_OPENED');
      emitterService.off('DRAFT_OPENED');
      emitterService.off('DRAFT_CLOSED');
    };
  }, []);

  const close = () => {
    setIsOpened(false);

    if (openedDraft) {
      emitterService.emit('DRAFT_CLOSED', openedDraft.draftId);
      setOpenedDraft(null);
    }
  };

  const send = async (data: ComposeEmailFormValues) => {
    try {
      const message = await sendMessage({ createMessageDto: data }).unwrap();
      await dispatch(getSentCountRefreshAction(user.email));
      notification.success({ message: NotificationConfig.message.SENT, placement: NotificationConfig.placement });
      emitterService.emit('MESSAGE_SENT', message);
      close();
    } catch (e) {
      notification.error({ message: NotificationConfig.message.WENT_WRONG, placement: NotificationConfig.placement });
    }
  };

  const saveAsDraft = async (upsertDraftDto: SaveAsDraftFormValues) => {
    try {
      const draftId = openedDraft?.draftId;
      const draft = await (draftId ? updateDraft({ draftId, upsertDraftDto }).unwrap() : createDraft({ upsertDraftDto }).unwrap());
      await dispatch(getDraftCountRefreshAction());
      notification.success({
        message: draftId ? NotificationConfig.message.UPDATED : NotificationConfig.message.SAVED_AS_DRAFT,
        placement: NotificationConfig.placement,
      });
      close();
      emitterService.emit('DRAFT_SAVED', draft);
    } catch (e) {
      notification.error({ message: NotificationConfig.message.WENT_WRONG, placement: NotificationConfig.placement });
    }
  };

  return (
    <>
      {isOpened && (
        <Card
          {...restProps}
          className={`${className} ${styles.root}`}
          bordered={false}
          size="small"
          title="New Message"
          extra={
            <Button
              type="text"
              size="small"
              icon={<CloseOutlined />}
              onClick={close}
            />
          }
        >
          <Form
            draft={openedDraft}
            onSend={send}
            onSaveAsDraft={saveAsDraft}
            sendIsLoading={sendIsLoading}
            saveAsDraftIsLoading={createDraftIsLoading || updateDraftIsLoading}
          />
        </Card>
      )}
    </>
  );
};
