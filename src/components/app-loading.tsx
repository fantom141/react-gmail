import { Row, Spin } from 'antd';
import React from 'react';

export const AppLoading = () => {
  return (
    <Row
      align="middle"
      justify="center"
      style={{ height: '100vh' }}
    >
      <Spin size="large"></Spin>
    </Row>
  )
}
