import styles from './styles.module.scss';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, Divider, Input, Row, Space, theme } from 'antd';
import { composeEmailFormValidationSchema } from '../utils';
import { ComposeEmailFormValues } from '../types';
import { yupResolver } from '@hookform/resolvers/yup';
import { ControlError } from '../ControlError';
import classnames from 'classnames';
import { FormProps } from './types';

const { useToken } = theme;
const { TextArea } = Input;
const { Compact } = Space;

export const Form = ({ onSend, onSaveAsDraft, sendIsLoading, saveAsDraftIsLoading }: FormProps) => {
  const subjectClassNames = classnames(styles.control, styles.subject);
  const contentClassNames = classnames(styles.control, styles.content);

  const {
    token: { colorErrorBg },
  } = useToken();

  const { control, handleSubmit, getValues } = useForm<ComposeEmailFormValues>({
    mode: 'onBlur',
    resolver: yupResolver(composeEmailFormValidationSchema),
  });

  const onSubmit = (data: ComposeEmailFormValues) => {
    console.log(data);
    onSend(data);
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
      className={styles.root}
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
            className={styles.control}
            suffix={invalid ? <ControlError message={error.message} /> : <span />}
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
            className={subjectClassNames}
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
            className={contentClassNames}
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
            onClick={() => onSaveAsDraft(getValues())}
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
