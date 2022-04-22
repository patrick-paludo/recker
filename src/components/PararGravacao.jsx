import React, { useState } from 'react';
import { Modal, Button, Space } from 'antd';
import stopButton from '../img/stop-button.png';
import saveButton from '../img/disk.png';
import '../App.css';
import timer from "../js/timer";
import { Icon } from '@ant-design/compatible';
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
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <div className="botaoFunc">
                <Button onClick={() => {pararGravacao(); stopTimer(); showModal()}}>
                    <Icon component={(<img src={stopButton} style={{ height: `8vmin` }} />)} />
                </Button>
            </div>
            <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <p>PLACEHOLDER - OLHA QUE LEGAL VOCE GRAVOU ISSO AQUI Ó:</p>
                <p>.................Gravação.................</p>
                <Space>
                    <Button type="text" onClick={salvarArquivo}>
                        <img src={saveButton} className="botaoFunc"/>
                    </Button>
                    <Button type="primary">Button</Button>
                    <Button type="primary">Button</Button>
                </Space>
            </Modal>
        </>
    );
};

export default PararGravacao;