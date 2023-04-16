import styles from './styles.module.scss';
import { useContext } from 'react';
import { Button, Card, notification } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { Form } from './Form';
import { ComposeEmailFormValues, ComposeEmailProps, SaveAsDraftFormValues } from './types';
import { enhancedApi as messageApi, useMessageControllerCreateMessageMutation } from '@/store/api/message-api';
import { enhancedApi as draftApi, useDraftControllerCreateDraftMutation } from '@/store/api/draft-api';
import { useDispatch } from 'react-redux';
import { getDraftsCountStoreQueryArgs, getSentCountStoreQueryArgs } from '@/utils';
import { AuthContext } from '@/context/AuthContext';
import { AppDispatch } from '@/store';

export const ComposeEmail = ({ onClose, ...props }: ComposeEmailProps) => {
  const { className, ...restProps } = props;
  const [sendMessage, { isLoading: sendIsLoading }] = useMessageControllerCreateMessageMutation();
  const [saveMessageAsDraft, { isLoading: saveAsDraftIsLoading }] = useDraftControllerCreateDraftMutation();

  const { user } = useContext(AuthContext);
  const dispatch = useDispatch<AppDispatch>();

  const send = async (data: ComposeEmailFormValues) => {
    try {
      await sendMessage({ createMessageDto: data }).unwrap();
      await dispatch(messageApi.util.prefetch('messageControllerGetCount', getSentCountStoreQueryArgs(user.email), { force: true }));
      notification.success({ message: 'Successfully sent', placement: 'bottom' });
      onClose();
    } catch (e) {
      notification.error({ message: 'Something went wrong', placement: 'bottom' });
    }
  };

  const saveAsDraft = async (data: SaveAsDraftFormValues) => {
    try {
      await saveMessageAsDraft({ upsertDraftDto: data }).unwrap();
      await dispatch(draftApi.util.prefetch('draftControllerGetCount', getDraftsCountStoreQueryArgs(), { force: true }));
      notification.success({ message: 'Successfully saved as draft', placement: 'bottom' });
      onClose();
    } catch (e) {
      notification.error({ message: 'Something went wrong', placement: 'bottom' });
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
