import styles from './styles.module.scss';
import { useContext } from 'react';
import { Button, Card, notification } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { Form } from './Form';
import { ComposeEmailFormValues, ComposeEmailProps, SaveAsDraftFormValues } from './types';
import { useMessageControllerCreateMessageMutation } from '@/store/api/message-api';
import { useDraftControllerCreateDraftMutation } from '@/store/api/draft-api';
import { useDispatch } from 'react-redux';
import { AppDispatch, getDraftCountRefreshAction, getSentCountRefreshAction } from '@/store';
import { AuthContext } from '@/context/AuthContext';
import { NotificationConfig } from '@/configs';

export const ComposeEmail = ({ onClose, ...props }: ComposeEmailProps) => {
  const { className, ...restProps } = props;
  const [sendMessage, { isLoading: sendIsLoading }] = useMessageControllerCreateMessageMutation();
  const [saveMessageAsDraft, { isLoading: saveAsDraftIsLoading }] = useDraftControllerCreateDraftMutation();

  const { user } = useContext(AuthContext);
  const dispatch = useDispatch<AppDispatch>();

  const send = async (data: ComposeEmailFormValues) => {
    try {
      await sendMessage({ createMessageDto: data }).unwrap();
      await dispatch(getSentCountRefreshAction(user.email));
      notification.success({ message: NotificationConfig.message.SENT, placement: NotificationConfig.placement });
      onClose();
    } catch (e) {
      notification.error({ message: NotificationConfig.message.WENT_WRONG, placement: NotificationConfig.placement });
    }
  };

  const saveAsDraft = async (data: SaveAsDraftFormValues) => {
    try {
      await saveMessageAsDraft({ upsertDraftDto: data }).unwrap();
      await dispatch(getDraftCountRefreshAction());
      notification.success({ message: NotificationConfig.message.SENT, placement: NotificationConfig.placement });
      onClose();
    } catch (e) {
      notification.error({ message: NotificationConfig.message.WENT_WRONG, placement: NotificationConfig.placement });
    }
  };

  const closeButton = (
    <Button
      type="text"
      size="small"
      icon={<CloseOutlined />}
      onClick={onClose}
    />
  );

  return (
    <Card
      {...restProps}
      className={`${className} ${styles.root}`}
      bordered={false}
      size="small"
      title="New Message"
      extra={closeButton}
    >
      <Form
        onSend={send}
        onSaveAsDraft={saveAsDraft}
        sendIsLoading={sendIsLoading}
        saveAsDraftIsLoading={saveAsDraftIsLoading}
      />
    </Card>
  );
};
