import React, { useState } from 'react';
import { Modal, Button, Space } from 'antd';
import stopButton from '../img/stop.png';
import '../App.css';
import PopConfirmDescartaGravacao from './PopConfirmDescartaGravacao';
import timer from "../js/timer";
const stopTimer = timer.reset;


const PararGravacao = () => {
    const pararGravacao = () => {
        window.api.send("toMain", { funcao: "pararGravacao" });
    }
    const salvarArquivo = () => {
        window.api.sendAsync("toMainAsync", { funcao: "salvarArquivo" });
    }

    const [isModalVisible, setIsModalVisible] = useState(false);

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
                <Button type="text" onClick={() => {pararGravacao(); stopTimer(); showModal()}}>
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
                <p>.................Gravação.................</p>
                
            </Modal>
        </div>
        
    );
};

export default PararGravacao;
