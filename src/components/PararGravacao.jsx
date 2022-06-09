import '../App.css';
import React, { useState } from 'react';
import { Modal, Button, Space } from 'antd';
import stopButton from '../img/stop.png';
import PopConfirmDescartaGravacao from './PopConfirmDescartaGravacao.jsx';
import timer from "../js/timer.js";
import AudioPlayer from '../components/AudioPlayer';
const stopTimer = timer.reset;

const PararGravacao = (props) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [countRecordings, setCountRecordings] = useState(0);

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
            setCountRecordings(countRecordings + 1);
            props.setIsInRecording(false);
        }
    }

    const showModal = () => {
        setIsModalVisible(true);   
    };

    const handleOk = () => {
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
                <AudioPlayer key="1" countRecordings={countRecordings}/>
            </Modal>
        </div>
        
    );
};

export default PararGravacao;
