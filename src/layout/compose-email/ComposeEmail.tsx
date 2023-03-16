import './styles.scss';
import { HTMLAttributes } from 'react';
import { Button, Card } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { ComposeEmailForm } from './ComposeEmailForm';

interface Props extends HTMLAttributes<HTMLDivElement> {
  close: () => void;
}

export const ComposeEmail = ({ close, ...props }: Props) => {
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
      className={`${className} compose-email__container`}
      bordered={false}
      size="small"
      title="New Message"
      extra={closeButton}
    >
      <ComposeEmailForm />
    </Card>
  );
};
