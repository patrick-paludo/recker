// Importações e declarações de variáveis
import React from "react";
import { Modal, Button, Space } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
const { confirm } = Modal;


function showConfirm() {
  // Função para chamar a função de sair no processo main
  const sair = () => {
      window.api.send("toMain", { funcao: "sair" });
  }

  // Modal de confirmação
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
    // Retorna o botão para sair e o modal de confirmação
    <Space wrap>
      <Button type="primary" shape="round" style={{ 'marginTop': '50px' }} onClick={showConfirm}>SAIR</Button>
    </Space>
  )
}