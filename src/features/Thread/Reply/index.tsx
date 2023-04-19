import styles from './styles.module.scss';
import { ReplyFormValues, ReplyProps } from './types';
import { ContentBlock } from '@/components/ContentBlock';
import classnames from 'classnames';
import { Button, Input, notification, Row, Space } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { replyFormValidationSchema, toCreateMessageDto } from './utils';
import React, { useContext, useState } from 'react';
import { useMessageControllerCreateMessageMutation } from '@/store/api/message-api';
import { AuthContext } from '@/context/AuthContext';
import { NotificationConfig } from '@/configs';

const { TextArea } = Input;

const defaultMinTextAreaRows = 1;

export const Reply = ({ openedMessage, onMessageSent, className, ...restProps }: ReplyProps) => {
  const rootClassNames = classnames(styles.root, className);

  const { user: curUser } = useContext(AuthContext);
  const [minTextAreaRows, setMinTextAreaRws] = useState<number>(defaultMinTextAreaRows);
  const [sendMessage, { isLoading }] = useMessageControllerCreateMessageMutation();

  const { control, handleSubmit, formState, getValues, reset } = useForm<ReplyFormValues>({
    mode: 'onBlur',
    resolver: yupResolver(replyFormValidationSchema),
  });

  const clearForm = () => {
    reset();
    setMinTextAreaRws(defaultMinTextAreaRows);
  };

  const onSubmit = async (formValues: ReplyFormValues) => {
    try {
      const message = await sendMessage(toCreateMessageDto({ formValues, openedMessage, curUser })).unwrap();
      clearForm();
      onMessageSent(message);
      notification.success({ message: NotificationConfig.message.SENT, placement: NotificationConfig.placement });
    } catch (e) {
      notification.error({ message: NotificationConfig.message.WENT_WRONG, placement: NotificationConfig.placement });
    }
  };

  return (
    <ContentBlock
      {...restProps}
      borderRadius
      className={rootClassNames}
    >
      <form
        autoComplete="none"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Space
          direction="vertical"
          size={16}
          className={styles.space}
        >
          <Space
            direction="vertical"
            size={8}
            className={styles.space}
          >
            <Controller
              name="subject"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Subject"
                />
              )}
            />

            <Controller
              name="content"
              control={control}
              render={({ field }) => (
                <TextArea
                  {...field}
                  placeholder="Write your message..."
                  autoSize={{ minRows: minTextAreaRows, maxRows: 10 }}
                  onFocus={() => setMinTextAreaRws(6)}
                  onBlur={() => !getValues().content && setMinTextAreaRws(defaultMinTextAreaRows)}
                />
              )}
            />
          </Space>

          <Row justify="end">
            <Space size={4}>
              <Button
                size="middle"
                type="text"
                disabled={!formState.isDirty || isLoading}
                onClick={clearForm}
              >
                Clear
              </Button>
              <Button
                size="middle"
                type="primary"
                disabled={!formState.isValid}
                loading={isLoading}
                htmlType="submit"
              >
                Reply
              </Button>
            </Space>
          </Row>
        </Space>
      </form>
    </ContentBlock>
  );
};
