import { Button, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH } from '@/firebase';
import React, { PropsWithChildren, useState } from 'react';

const { Item } = Form;
const { Password } = Input;

interface ILoginData {
  email: string;
  password: string;
}

export const LoginForm = ({ successFn }: PropsWithChildren<{ successFn: () => void }>) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm<ILoginData>();

  const onFinish = (formData: ILoginData) => {
    setLoading(true);

    signInWithEmailAndPassword(FIREBASE_AUTH, formData.email, formData.password)
      .then(res => {
        console.log({ res });
        successFn();
      })
      .catch(() => {
        setLoading(false);
        form.setFields([
          { name: 'email', errors: [''] },
          { name: 'password', errors: ['Invalid credentials'] },
        ]);
      });
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
    >
      <Item
        name="email"
        label="Email"
        rules={[{ required: true, message: 'Required field' }]}
      >
        <Input
          prefix={<UserOutlined />}
          placeholder="mail@domain.com"
        />
      </Item>

      <Item
        name="password"
        label="Password"
        rules={[{ required: true, message: 'Required field' }]}
      >
        <Password
          prefix={<LockOutlined />}
          placeholder="********"
        />
      </Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{ width: '100%' }}
          loading={loading}
        >
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
};
