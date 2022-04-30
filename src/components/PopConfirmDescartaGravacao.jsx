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
      this.props.handleCancelChild();
      setVisible(false);
    };
  
    const handleCancel = () => {
      setVisible(false);
    };
  
    return (
      <Popconfirm
        title="Deseja realmente descartar a gravação?"
        visible={visible}
        onConfirm={this.props.handleCancelChild(false)}
        okButtonProps={{ danger:true }}
        onCancel={handleCancel}
      >
        <Button type="default" danger onClick={showPopconfirm}>
          Descartar
        </Button>
      </Popconfirm>
    );
  };
  
  export default PopConfirmDescartaGravacao;