// Importações e declarações de variáveis
import '../App.css';
import React, { useState } from 'react';
import { Modal, Button, Tooltip } from 'antd';
import ultimasGravacoes from '../img/storyboard.png';
import ListaGravacoes from './ListaGravacoes';

const UltimasGravacoes = (props) => {
    // useState para o modal
    const [isModalVisible, setIsModalVisible] = useState(false);

    // useState para o arquivo de áudio
    const [audioFileName, setAudioFileName] = useState('');

    // useState para o título do modal
    const [fileName, setFileName] = useState('Áudio: ');

    // Blob vazio para ajustes de áudio
    let blobVazio = new Blob([]);

    let arrayGravacoes = [];

    // Função para buscar o arquivo de áudio 
    // que o usuário deseja abrir
    const buscarGravacoes = async () => {
        window.api.sendAsync("toMainAsync", { funcao: "buscarGravacoes" });
        window.api.receive("fromMain", (args) => {
            if (args[0] === 'gravacaoBuscada') {
                arrayGravacoes = args[1];
            }
        });
    }

    // Função para abrir o modal
    const handleClick = () => {
        if (!props.isInRecording) {
            buscarGravacoes();
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
                <Tooltip title="Últimas gravações" color={"#3978fa"}>
                    <Button type="text" onClick={handleClick}>
                        <img className="botaoFunc" src={ultimasGravacoes}></img>
                    </Button>
                </Tooltip>
            </div>
            <Modal 
                title="Últimas gravações"
                visible={isModalVisible}
                closable={false}
                footer={[
                    <Button key="submit" type="danger" onClick={handleCancel}>
                        Fechar
                    </Button>,
                ]}
            >
               <ListaGravacoes arrayGravacoes={arrayGravacoes}/>
            </Modal>
        </div>
    );
};

export default UltimasGravacoes;
