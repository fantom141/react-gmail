import styles from './ComposeEmail.module.scss';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, Divider, Input, Row, Space, theme } from 'antd';
import { ComposeEmailFormData, composeEmailFormValidationSchema, SaveAsDraftFormData } from './meta';
import { yupResolver } from '@hookform/resolvers/yup';
import { ComposeEmailFormControlError } from './ComposeEmailFormControlError';

const { useToken } = theme;
const { TextArea } = Input;
const { Compact } = Space;

interface Props {
  send: (data: ComposeEmailFormData) => void;
  saveAsDraft: (data: SaveAsDraftFormData) => void;
  sendIsLoading: boolean;
  saveAsDraftIsLoading: boolean;
}

export const ComposeEmailForm = ({ send, saveAsDraft, sendIsLoading, saveAsDraftIsLoading }: Props) => {
  const {
    token: { colorErrorBg },
  } = useToken();

  const { control, handleSubmit, getValues } = useForm<ComposeEmailFormData>({
    mode: 'onBlur',
    resolver: yupResolver(composeEmailFormValidationSchema),
  });

  const onSubmit = (data: ComposeEmailFormData) => {
    console.log(data);
    send(data);
  };

  const divider = (
    <Divider
      type="horizontal"
      style={{ margin: 0 }}
    />
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={styles.formContent}
      autoComplete="none"
    >
      <Controller
        name="email"
        control={control}
        render={({ field, fieldState: { invalid, error } }) => (
          <Input
            {...field}
            bordered={false}
            placeholder="To"
            className={styles.formControl}
            suffix={invalid ? <ComposeEmailFormControlError message={error.message} /> : <span />}
            style={{ backgroundColor: invalid ? colorErrorBg : '' }}
          />
        )}
      />

      {divider}

      <Controller
        name="subject"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            bordered={false}
            placeholder="Subject"
            className={`${styles.formControl} ${styles.formControlSubject}`}
          />
        )}
      />

      {divider}

      <Controller
        name="content"
        control={control}
        render={({ field, fieldState: { invalid } }) => (
          <TextArea
            {...field}
            bordered={false}
            placeholder="Write your message..."
            className={`${styles.formControl} ${styles.formControlMessage}`}
            style={{ backgroundColor: invalid ? colorErrorBg : '' }}
          />
        )}
      />

      {divider}

      <Row justify="end">
        <Compact>
          <Button
            type="text"
            size="middle"
            htmlType="button"
            loading={saveAsDraftIsLoading}
            disabled={sendIsLoading}
            onClick={() => saveAsDraft(getValues())}
          >
            Save as draft
          </Button>
          <Button
            type="primary"
            size="middle"
            htmlType="submit"
            loading={sendIsLoading}
            disabled={saveAsDraftIsLoading}
          >
            Send
          </Button>
        </Compact>
      </Row>
    </form>
  );
};
