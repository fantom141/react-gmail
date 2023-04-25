import styles from './styles.module.scss';
import { Button, Row, Space, Tooltip } from 'antd';
import { ArrowLeftOutlined, DeleteOutlined, PrinterOutlined } from '@ant-design/icons';
import { ContentBlock } from '@/components/ContentBlock';
import { HeaderProps } from './types';

export const Header = ({ batchTrashIsDisplayed, onClose, onPrint, onTrash }: HeaderProps) => {
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
          <Tooltip
            title="Print thread"
            placement="bottom"
          >
            <Button
              size="small"
              type="text"
              icon={<PrinterOutlined />}
              onClick={onPrint}
            />
          </Tooltip>
          {batchTrashIsDisplayed && (
            <Tooltip
              title="Trash thread"
              placement="bottom"
            >
              <Button
                size="small"
                type="text"
                icon={<DeleteOutlined />}
                onClick={onTrash}
              />
            </Tooltip>
          )}
        </Space>
      </Row>
    </ContentBlock>
  );
};
