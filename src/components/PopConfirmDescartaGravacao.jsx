import { useState } from 'react';
import { Button, Popconfirm } from 'antd';
import PararGravacao from './PararGravacao';

const PopConfirmDescartaGravacao = () => {
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
  
    const showPopconfirm = () => {
      setVisible(true);
    };
  
    const handleOk = () => {
    //   setConfirmLoading(true);
    //   setTimeout(() => {
    //     setVisible(false);
    //     setConfirmLoading(false);
    //   }, 2000);
        setVisible(false);
    };
  
    const handleCancel = () => {
      console.log('Clicked cancel button');
      setVisible(false);
    };
  
    return (
      <Popconfirm
        title="Deseja realmente descartar a gravação?"
        visible={visible}
        onConfirm={handleOk}
        okButtonProps={{ loading: confirmLoading, danger:true }}
        onCancel={handleCancel}
      >
        <Button type="default" danger onClick={showPopconfirm}>
          Descartar
        </Button>
      </Popconfirm>
    );
  };
  
  export default PopConfirmDescartaGravacao;