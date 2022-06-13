import '../App.css';
import React, { useState } from 'react';
import { Modal, Button, Space } from 'antd';
import folderButton from '../img/openfolder.png';
import ReactAudioPlayer from 'react-audio-player';

const ModalLeitor = (props) => {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [audioFileName, setAudioFileName] = useState('');

    // const buscarArquivo = async () => {
    //     window.api.sendAsync("toMainAsync", { funcao: "buscarArquivo" });
    //     window.api.receive("fromMain", (resposta) => {
    //         if (resposta) {
    //             var blob = new Blob([resposta]);  
    //             setAudioFileName(URL.createObjectURL(blob));
    //         }
    //         setIsModalVisible(true);
    //     });
    // }

    const buscarArquivo = async () => {
        window.api.sendAsync("toMainAsync", { funcao: "buscarArquivo" });
        window.api.receive("fromMain", (args) => {
            if (args[0] === 'arquivoBuscado') {
                var blob = new Blob([args[1]]);  
                setAudioFileName(URL.createObjectURL(blob));
            }
            setIsModalVisible(true);
        });
    }

    const fecharModal = () => {
        setIsModalVisible(false);
    };

    return (
        <div>
            <div>
                <Button type="text" onClick={buscarArquivo}>
                    <img className="botaoFunc" src={folderButton}></img>
                </Button>
            </div>
            <Modal 
                title="Deseja salvar a gravação?" 
                visible={isModalVisible}
                footer={[
                    <Button key="submit" type="danger" onClick={fecharModal}>
                      Fechar
                    </Button>,
                  ]}
            >
                <div>
                    <ReactAudioPlayer
                        src={audioFileName}
                        controls
                        style={{ width: '100%' }}
                    /> 
                </div>
            </Modal>
        </div>
        
    );
};

export default ModalLeitor;
