import './AudioPlayer.css';
import React from 'react';
// import recorder from "../js/recorder.js";
import ReactAudioPlayer from 'react-audio-player';
const tempFileName = require("../js/recorder.js").tempFileName

const AudioPlayer = () => {
    //////////////////////////////////////
    // IMPLEMENTAR USE-EFFECT!!!!!!!!!!!!!
    //////////////////////////////////////
    return (
        <div>
            <ReactAudioPlayer
                src={tempFileName}
                controls
            />
        </div>
        
    );
};

export default AudioPlayer;
