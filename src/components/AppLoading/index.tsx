import styles from './styles.module.scss';
import { Row, Spin } from 'antd';
import React from 'react';

export const AppLoading = () => {
  return (
    <Row
      align="middle"
      justify="center"
      className={styles.root}
    >
      <Spin size="large"></Spin>
    </Row>
  );
};
