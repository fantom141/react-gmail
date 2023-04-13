import styles from './styles.module.scss';
import React from 'react';
import { Form } from 'antd';
import { FormItemProps } from './types';

const { Item } = Form;

export const FormItem = ({ label, help, children }: FormItemProps) => {
  return (
    <Item
      label={label}
      colon={false}
      labelAlign="left"
      className={styles.root}
      help={help}
    >
      {children}
    </Item>
  );
};
