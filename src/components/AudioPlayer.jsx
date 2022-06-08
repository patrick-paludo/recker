import './AudioPlayer.css';
import React from 'react';
import ReactAudioPlayer from 'react-audio-player';
// const isDev = require("electron-is-dev");
// let tempFileName;
const AudioPlayer = () => {
    // // UseEffect that will load the audio file when the component is mounted   
    React.useEffect(() => {
        buscarTempFileName()
    }, []);

    // create a usestate to store a string with the audio file name
    const [audioFileName, setAudioFileName] = React.useState('');

    const buscarTempFileName = () => {
        window.api.send("toMain", { funcao: "buscarTempFileName" });
        window.api.receive("fromMain", (resposta) => {
            if (resposta) {
                setAudioFileName(resposta);
            }
        });
    }

    

    return (    
        <div>
            <ReactAudioPlayer
                src={audioFileName}
                controls
            /> 
        </div>
    );
};

export default AudioPlayer;
