import styles from './styles.module.scss';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, Divider, Input, Row, theme } from 'antd';
import { ComposeEmailFormData, composeEmailFormValidationSchema } from './meta';
import { yupResolver } from '@hookform/resolvers/yup';
import { ComposeEmailFormControlError } from './ComposeEmailFormControlError';

const { useToken } = theme;
const { TextArea } = Input;

interface Props {
  send: (data: ComposeEmailFormData) => void
}

export const ComposeEmailForm = ({send}: Props) => {
  const {
    token: { colorErrorBg },
  } = useToken();

  const { control, handleSubmit } = useForm<ComposeEmailFormData>({
    mode: 'onBlur',
    resolver: yupResolver(composeEmailFormValidationSchema),
  });

  const onSubmit = (data: ComposeEmailFormData) => {
    console.log(data);
    send(data)
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
        <Button
          type="primary"
          size="middle"
          htmlType="submit"
        >
          Send
        </Button>
      </Row>
    </form>
  );
};
