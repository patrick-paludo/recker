import '../App.css';
import React, { useState } from 'react';
import { Modal, Button, Space } from 'antd';
import stopButton from '../img/stop.png';
import PopConfirmDescartaGravacao from './PopConfirmDescartaGravacao';
import timer from "../js/timer";
import AudioPlayer from '../components/AudioPlayer';

const stopTimer = timer.reset;

const PararGravacao = (props) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const pararGravacao = () => {
        window.api.send("toMain", { funcao: "pararGravacao" });
    }
    const salvarArquivo = async () => { 
        window.api.sendAsync("toMainAsync", { funcao: "salvarArquivo" });
        window.api.receive("fromMain", (resposta) => {
            if (resposta) {
                setIsModalVisible(false);
            }
        });

    };


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
                title="Deseja salvar a gravação?" 
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
                
                <Space>
                    <AudioPlayer/>
                </Space>
                
            </Modal>
        </div>
        
    );
};

export default PararGravacao;
