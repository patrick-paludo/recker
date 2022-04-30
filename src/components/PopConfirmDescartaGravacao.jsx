import { useState } from 'react';
import { Button, Popconfirm } from 'antd';

const PopConfirmDescartaGravacao = (props) => {
    const [visible, setVisible] = useState(false);

  
    const showPopconfirm = () => {
      setVisible(true);
    };
  
    const handleOk = () => {
      setVisible(false);
      props.handleCancelChild();
      descartarGravacao();
    };
  
    const handleCancel = () => {
      setVisible(false);
    };

    const descartarGravacao = () => {
      window.api.send("toMain", { funcao: "descartarGravacao" });
    }
  
    return (
      <Popconfirm
        title="Deseja realmente descartar a gravação?"
        visible={visible}
        onConfirm={handleOk}
        okButtonProps={{ danger:true }}
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