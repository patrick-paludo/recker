// Importações e declarações de variáveis
import '../App.css';
import React, { useState } from 'react';
import { Modal, Button, Tooltip } from 'antd';
import folderButton from '../img/openfolder.png';
import ReactAudioPlayer from 'react-audio-player';

const ModalLeitor = (props) => {
    // useState para o modal
    const [isModalVisible, setIsModalVisible] = useState(false);

    // useState para o arquivo de áudio
    const [audioFileName, setAudioFileName] = useState('');

    // useState para o título do modal
    const [fileName, setFileName] = useState('Áudio: ');

    // Blob vazio para ajustes de áudio
    let blobVazio = new Blob([]);

    // Função para buscar o arquivo de áudio 
    // que o usuário deseja abrir
    const buscarArquivo = async () => {
        window.api.sendAsync("toMainAsync", { funcao: "buscarArquivo" });
        window.api.receive("fromMain", (args) => {
            if (args[0] === 'arquivoBuscado') {
                // Retorna byteArray e transforma em blob
                var blob = new Blob([args[1]]);  

                // Transforma blob em url
                setAudioFileName(URL.createObjectURL(blob));

                // Atualiza o título do modal
                setFileName("Áudio: " + args[2]);
            }
        });
    }

    // Função para abrir o modal
    const handleClick = () => {
        if (!props.isInRecording) {
            buscarArquivo();
            setIsModalVisible(true);
        }
    }
    
    // Função para fechar o modal
    const handleCancel = () => {
        var leitor = document.getElementById('leitor');
        setAudioFileName(URL.createObjectURL(blobVazio));
        leitor.pause();
        leitor.currentTime = 0;
        setFileName('Áudio: ');
        setIsModalVisible(false);
    };

    return (
        // Renderiza o botão para abrir o modal e o 
        // próprio modal, com o componente do player de áudio
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
