import { Button, Modal, Tooltip, Typography } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { useSignOut } from 'react-firebase-hooks/auth';
import { FIREBASE_AUTH } from '@/firebase';
import { useState } from 'react';

const { Text } = Typography;

export const Logout = () => {
  const [signOut, loading] = useSignOut(FIREBASE_AUTH);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = () => signOut();
  const handleCancel = () => setIsModalOpen(false);

  return (
    <>
      <Tooltip
        title="logout"
        mouseEnterDelay={0.5}
      >
        <Button
          type="text"
          icon={<LogoutOutlined />}
          disabled={loading}
          onClick={() => setIsModalOpen(true)}
        />
      </Tooltip>

      <Modal
        title="Logout"
        open={isModalOpen}
        closable={false}
        okText="Confirm"
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Text>Are you sure to logout?</Text>
      </Modal>
    </>
  );
};
