import '../App.css';
import React, { useState } from 'react';
import { Modal, Button, Space } from 'antd';
import stopButton from '../img/stop.png';
import PopConfirmDescartaGravacao from './PopConfirmDescartaGravacao';
import timer from "../js/timer";
import {
    PlayCircleOutlined,
    PauseOutlined,
  } from '@ant-design/icons';

const stopTimer = timer.reset;


const PararGravacao = (props) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const pararGravacao = () => {
        window.api.send("toMain", { funcao: "pararGravacao" });
    }
    const playTempRec = () => {
        window.api.send("toMain", { funcao: "playTempRec" });
    }
    const pauseTempRec = () => {
        window.api.send("toMain", { funcao: "pauseTempRec" });
    }
    const salvarArquivo = () => {
        window.api.sendAsync("toMainAsync", { funcao: "salvarArquivo" });
    }

    const handleStop = () => {
        if(props.isInRecording === true){
            pararGravacao(); 
            stopTimer(); 
            showModal();
            props.setIsInRecording(false);
        }
    }

    const showModal = () => {
        setIsModalVisible(true);   
    };

    const handleOk = () => {
        // setIsModalVisible(false);
        salvarArquivo();
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <div>
            <div>
                <Button type="text" onClick={handleStop}>
                    <img className="botaoFunc" src={stopButton}></img>
                </Button>
            </div>
            <Modal 
                title="Gravação" 
                visible={isModalVisible}
                closable={false}
                footer={[
                    <PopConfirmDescartaGravacao 
                        key="1" handleCancelChild={handleCancel} 
                    />,
                    <Button key="submit" type="primary" onClick={handleOk}>
                      Salvar
                    </Button>,
                  ]}
            >
                <p>Deseja salvar a gravação?</p>
                <Space>
                    <Button type="primary" onClick={playTempRec}>
                        <PlayCircleOutlined /> Play
                    </Button>
                    <Button type="primary" onClick={pauseTempRec}>
                        <PauseOutlined /> Pause
                    </Button>
                </Space>
                
            </Modal>
        </div>
        
    );
};

export default PararGravacao;
