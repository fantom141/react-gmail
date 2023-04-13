import { Button, Row, Space } from 'antd';
import { ArrowLeftOutlined, DeleteOutlined, PrinterOutlined } from '@ant-design/icons';
import { ContentBlock } from '@/components/ContentBlock';

interface Props {
  close: () => void;
}

export const ThreadHeader = ({ close }: Props) => {
  return (
    <ContentBlock transparent>
      <Row justify="space-between">
        <Button
          type="text"
          size="small"
          icon={<ArrowLeftOutlined />}
          onClick={close}
        />

        <Space>
          <Button
            size="small"
            type="text"
            icon={<PrinterOutlined />}
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
