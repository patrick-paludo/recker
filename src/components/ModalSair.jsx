import React from "react";
import { Modal, Button, Space } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;

function showConfirm() {
  const sair = () => {
      window.api.send("toMain", { funcao: "sair" });
  }

  confirm({
      title: 'Realmente deseja sair?',
      icon: <ExclamationCircleOutlined />,
      content: '',
      onOk() {
          sair();
      },
      onCancel() {
      
      },
  });
}

export default function ModalSair(){
  return (
    <Space wrap>
      <Button type="primary" shape="round" style={{ 'marginTop': '50px' }} onClick={showConfirm}>SAIR</Button>
    </Space>
  )
}