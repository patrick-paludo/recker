// Importações e declarações de variáveis
import '../App.css';
import React, { useState } from 'react';
import { Modal, Button, Tooltip } from 'antd';
import stopButton from '../img/stop.png';
import PopConfirmDescartaGravacao from './PopConfirmDescartaGravacao.jsx';
import timer from "../js/timer.js";
import AudioPlayer from '../components/AudioPlayer';
const stopTimer = timer.reset;

const PararGravacao = (props) => {
    // useState para o modal
    const [isModalVisible, setIsModalVisible] = useState(false);

    // useState para contador de gravações
    const [countRecordings, setCountRecordings] = useState(0);

    // Blob vazio para ajustes de áudio
    let blobVazio = new Blob([]);

    // Função para chamar a função de parar gravação no processo main
    const pararGravacao = () => {
        window.api.send("toMain", { funcao: "pararGravacao" });
    }

    // Função para chamar a função de salvar gravação no processo main
    const salvarArquivo = async () => { 
        window.api.sendAsync("toMainAsync", { funcao: "salvarArquivo" });
        window.api.receive("fromMain", (resposta) => {
            if (resposta === "arquivoSalvo") {
                // Fecha o modal quando receber a confirmação 
                // de que o arquivo foi salvo
                setIsModalVisible(false);
                resposta = null;
            }
        });
    };

    // Função para tratar a parada da gravação
    // Realiza as operações apenas se uma gravação estiver sendo feita
    const handleStop = () => {
        // Valida se está em gravação
        if(props.isInRecording){           
            pararGravacao(); // Para a gravação            
            stopTimer(); // Para o timer            
            showModal(); // Abre o modal       
            setCountRecordings(countRecordings + 1); // Atualiza o contador de gravações
            props.setIsInRecording(false); // Marca a gravação como encerrada
        }
    }

    // Função para abrir o modal
    const showModal = () => {
        setIsModalVisible(true);   
    };

    // Função para tratar botão de Salvar
    const handleOk = () => {
        salvarArquivo();
    };


    // Função para tratar botão de Descartar
    const handleCancel = () => {
        // Pausa o audio no player e seta o src como vazio
        var leitor = document.getElementById('leitor');
        leitor.src = URL.createObjectURL(blobVazio)
        leitor.pause();
        leitor.currentTime = 0;

        // Fecha o modal
        setIsModalVisible(false);
    };

    return (
        // Renderiza o botão para parar a gravação e o
        // próprio modal, com o componente do player de áudio
        <div>
            <div>
                <Tooltip title="Parar gravação" color={"#3978fa"}>
                    <Button type="text" onClick={handleStop}>
                        <img className="botaoFunc" src={stopButton}></img>
                    </Button>
                </Tooltip>
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
