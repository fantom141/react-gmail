import styles from './styles.module.scss';
import { ContentBlock } from '@/components/ContentBlock';
import { Space, theme, Typography } from 'antd';
import { DotDivider } from '@/components/DotDivider';
import { TextSmaller } from '@/components/TextSmaller';
import { PageHeaderProps } from './types';

const { Title } = Typography;
const { useToken } = theme;

export const PageHeader = ({ title, totalCount, extraInfo }: PageHeaderProps) => {
  const {
    token: { colorTextTertiary: color },
  } = useToken();

  return (
    <ContentBlock transparent>
      <Title
        level={5}
        className={styles.root}
      >
        {title}
      </Title>

      <Space
        split={extraInfo && <DotDivider />}
        size={0}
        style={{ color }}
      >
        <TextSmaller>{totalCount} Messages</TextSmaller>
        {extraInfo && <TextSmaller>{extraInfo}</TextSmaller>}
      </Space>
    </ContentBlock>
  );
};
