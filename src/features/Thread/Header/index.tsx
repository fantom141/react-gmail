import styles from './styles.module.scss';
import { Button, Row, Space } from 'antd';
import { ArrowLeftOutlined, DeleteOutlined, PrinterOutlined } from '@ant-design/icons';
import { ContentBlock } from '@/components/ContentBlock';
import { HeaderProps } from './types';

export const Header = ({ onClose, onPrint }: HeaderProps) => {
  return (
    <ContentBlock
      transparent
      className={styles.root}
    >
      <Row justify="space-between">
        <Button
          type="text"
          size="small"
          icon={<ArrowLeftOutlined />}
          onClick={onClose}
        />

        <Space>
          <Button
            size="small"
            type="text"
            icon={<PrinterOutlined />}
            onClick={onPrint}
          />
          <Button
            size="small"
            type="text"
            icon={<DeleteOutlined />}
          />
        </Space>
      </Row>
    </ContentBlock>
  );
};
