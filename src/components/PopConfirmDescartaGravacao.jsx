// Importações e declarações de variáveis
import { useState } from 'react';
import { Button, Popconfirm } from 'antd';

const PopConfirmDescartaGravacao = (props) => {
  // useState para o popconfirm
  const [visible, setVisible] = useState(false);

  // Função para abrir o popconfirm
  const showPopconfirm = () => {
    setVisible(true);
  };

  // Função para fechar o popconfirm
  const handleCancel = () => {
    setVisible(false);
  };

  // Função para fechar o popconfirm, o modal de prévia 
  // da gravação e descartar a gravação temporária
  const handleOk = () => {
    setVisible(false);
    props.handleCancelChild();
    descartarGravacao();
  };

  // Função para chamar função de descartar gravação no processo main
  const descartarGravacao = () => {
    window.api.send("toMain", { funcao: "descartarGravacao" });
  }

  return (
    // Renderiza o botão de descartar gravação e o popconfirm
    <Popconfirm
      title="Deseja realmente descartar a gravação?"
      visible={visible}
      onConfirm={handleOk}
      okButtonProps={{ danger: true }}
      onCancel={handleCancel}
      okText={"Sim"}
    >
      <Button type="default" danger onClick={showPopconfirm}>
        Descartar
      </Button>
    </Popconfirm>
  );
};

export default PopConfirmDescartaGravacao;