import '../App.css';
import React, { useState } from 'react';
import { Modal, Button, Tooltip } from 'antd';
import folderButton from '../img/openfolder.png';
import ReactAudioPlayer from 'react-audio-player';

const ModalLeitor = (props) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [audioFileName, setAudioFileName] = useState('');
    const [fileName, setFileName] = useState('Áudio: ');

    const buscarArquivo = async () => {
        window.api.sendAsync("toMainAsync", { funcao: "buscarArquivo" });
        window.api.receive("fromMain", (args) => {
            if (args[0] === 'arquivoBuscado') {
                var blob = new Blob([args[1]]);  
                setAudioFileName(URL.createObjectURL(blob));
                setFileName("Áudio: " + args[2]);
            }
        });
    }

    const handleClick = () => {
        if (!props.isInRecording) {
            buscarArquivo();
            setIsModalVisible(true);
        }
    }

    const handleCancel = () => {
        var leitor = document.getElementById('leitor');
        leitor.pause();
        leitor.currentTime = 0;
        leitor.src = "";
        setFileName('Áudio: ');
        setIsModalVisible(false);
    };

    return (
        <div>
            <div>
                <Tooltip title="Abrir áudio" color={"#3978fa"}>
                    <Button type="text" onClick={handleClick}>
                        <img className="botaoFunc" src={folderButton}></img>
                    </Button>
                </Tooltip>
            </div>
            <Modal 
                title={fileName}
                visible={isModalVisible}
                closable={false}
                footer={[
                    <Button key="submit" type="danger" onClick={handleCancel}>
                        Fechar
                    </Button>,
                ]}
            >
                <div>
                    <ReactAudioPlayer
                        src={audioFileName}
                        id="leitor"
                        controls
                        controlsList='nodownload'
                        style={{ width: '100%' }}
                    /> 
                </div>
            </Modal>
        </div>
    );
};

export default ModalLeitor;
