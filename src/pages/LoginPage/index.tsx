import styles from './styles.module.scss';
import { Col, Row, Typography } from 'antd';
import mailbox from '@/assets/mailbox.svg';
import { LoginForm } from './LoginForm';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { ColorSchemeSwitcher } from '@/features/ColorSchemeSwitcher';

const { Title } = Typography;

export const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <Row
      justify="center"
      align="middle"
      className={styles.root}
    >
      <Col span={12}>
        <Row justify="center">
          <Col span={12}>
            <Title
              level={2}
              className={styles.title}
            >
              Log In
              <ColorSchemeSwitcher
                size="small"
                className={styles.colorSchemeSwitcher}
              />
            </Title>

            <LoginForm onSuccess={() => navigate('/')}></LoginForm>
          </Col>
        </Row>
      </Col>

      <Col
        span={12}
        className={styles.rightCol}
      >
        <Row
          align="middle"
          justify="center"
          className={styles.rightRow}
        >
          <img
            src={mailbox}
            alt=""
            className={styles.img}
          />
        </Row>
      </Col>
    </Row>
  );
};
