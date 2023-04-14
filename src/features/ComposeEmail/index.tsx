import styles from './ComposeEmail.module.scss';
import { HTMLAttributes, useContext } from 'react';
import { Button, Card, notification } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { ComposeEmailForm } from './ComposeEmailForm';
import { ComposeEmailFormData, SaveAsDraftFormData } from './meta';
import { enhancedApi as messageApi, useMessageControllerCreateMessageMutation } from '@/store/api/message-api';
import { useDraftControllerCreateDraftMutation } from '@/store/api/draft-api';
import { useDispatch } from 'react-redux';
import { getDraftsCountStoreQueryArgs, getSentCountStoreQueryArgs } from '@/utils';
import { AuthContext } from '@/context/AuthContext';
import { AppDispatch } from '@/store';
import { enhancedApi as draftApi } from '@/store/api/draft-api';

interface Props extends HTMLAttributes<HTMLDivElement> {
  close: () => void;
}

export const ComposeEmail = ({ close, ...props }: Props) => {
  const { className, ...restProps } = props;
  const [sendMessage, { isLoading: sendIsLoading }] = useMessageControllerCreateMessageMutation();
  const [saveMessageAsDraft, { isLoading: saveAsDraftIsLoading }] = useDraftControllerCreateDraftMutation();

  const { user } = useContext(AuthContext);
  const dispatch = useDispatch<AppDispatch>();

  const send = async (data: ComposeEmailFormData) => {
    try {
      await sendMessage({ createMessageDto: data }).unwrap();
      await dispatch(messageApi.util.prefetch('messageControllerGetCount', getSentCountStoreQueryArgs(user.email), { force: true }));
      notification.success({ message: 'Successfully sent', placement: 'bottom' });
      close();
    } catch (e) {
      notification.error({ message: 'Something went wrong', placement: 'bottom' });
    }
  };

  const saveAsDraft = async (data: SaveAsDraftFormData) => {
    try {
      await saveMessageAsDraft({ upsertDraftDto: data }).unwrap();
      await dispatch(draftApi.util.prefetch('draftControllerGetCount', getDraftsCountStoreQueryArgs(), { force: true }));
      notification.success({ message: 'Successfully saved as draft', placement: 'bottom' });
      close();
    } catch (e) {
      notification.error({ message: 'Something went wrong', placement: 'bottom' });
    }
  };

  const closeButton = (
    <Button
      type="text"
      size="small"
      icon={<CloseOutlined />}
      onClick={close}
    />
  );

  return (
    <Card
      {...restProps}
      className={`${className} ${styles.container}`}
      bordered={false}
      size="small"
      title="New Message"
      extra={closeButton}
    >
      <ComposeEmailForm
        send={send}
        saveAsDraft={saveAsDraft}
        sendIsLoading={sendIsLoading}
        saveAsDraftIsLoading={saveAsDraftIsLoading}
      />
    </Card>
  );
};
