// Importações e declarações de variáveis
import React from 'react';
import ReactAudioPlayer from 'react-audio-player';

const AudioPlayer = (props) => {
    // useState para o arquivo de áudio
    const [audioFileName, setAudioFileName] = React.useState('');

    // useEffect para buscar o audio toda vez que 
    // uma nova gravação for iniciada 
    React.useEffect(() => {
        buscarTempFileName()
    }, [props.countRecordings]);

    // Função para buscar o arquivo de áudio temporário
    const buscarTempFileName = () => {
        window.api.send("toMain", { funcao: "buscarTempFileName" });
        window.api.receive("fromMain", (byteArrayRes) => {
            if (byteArrayRes) {
                // Retorna byteArray e transforma em blob
                var blob = new Blob([byteArrayRes]); 

                // Transforma blob em url
                setAudioFileName(URL.createObjectURL(blob));
            }
        });
    }

    return ( 
        // Renderiza o componente do player de áudio   
        <div>
            <ReactAudioPlayer
                src={audioFileName}
                id="leitor"
                controls
                controlsList='nodownload'
                style={{ width: '100%' }}
            /> 
        </div>
    );
};

export default AudioPlayer;
