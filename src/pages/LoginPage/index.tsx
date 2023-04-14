import { Col, Row, Typography } from 'antd';
import mailbox from '@/assets/mailbox.svg';
import { LoginForm } from './LoginForm';
import { useNavigate } from 'react-router-dom';
import React from 'react';

const { Title } = Typography;

export const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <Row
      justify="center"
      align="middle"
      style={{ height: '100vh' }}
    >
      <Col span={12}>
        <Row justify="center">
          <Col span={12}>
            <Title
              level={2}
              style={{ textAlign: 'center' }}
            >
              Log in
            </Title>

            <LoginForm successFn={() => navigate('/')}></LoginForm>
          </Col>
        </Row>
      </Col>

      <Col
        span={12}
        style={{ height: '100%', backgroundColor: '#F4F6F8' }}
      >
        <Row
          align="middle"
          justify="center"
          style={{ height: '100%' }}
        >
          <img
            src={mailbox}
            alt=""
            style={{ height: '10rem' }}
          />
        </Row>
      </Col>
    </Row>
  );
};
