import React from 'react';
import ReactAudioPlayer from 'react-audio-player';

const AudioPlayer = (props) => {
    // let audioFileName = null;
    // // UseEffect that will load the audio file when the component is mounted   
    React.useEffect(() => {
        buscarTempFileName()
    }, [props.countRecordings]);

    
    const [audioFileName, setAudioFileName] = React.useState('');

    const buscarTempFileName = () => {
        window.api.send("toMain", { funcao: "buscarTempFileName" });
        window.api.receive("fromMain", (byteArrayRes) => {
            if (byteArrayRes) {
                var blob = new Blob([byteArrayRes]);  
                setAudioFileName(URL.createObjectURL(blob));
            }
        });
    }

    return (    
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
