import styles from './styles.module.scss';
import { HTMLAttributes } from 'react';
import { Button, Card } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { ComposeEmailForm } from './ComposeEmailForm';
import { ComposeEmailFormData } from './meta';

interface Props extends HTMLAttributes<HTMLDivElement> {
  close: () => void;
  send: (data: ComposeEmailFormData) => void;
}

export const ComposeEmail = ({ close, send, ...props }: Props) => {
  const { className, ...restProps } = props;

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
      <ComposeEmailForm send={send}/>
    </Card>
  );
};
