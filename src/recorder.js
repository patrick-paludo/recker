// Imports modules.
const fs = require('fs'),
  path = require('path');
const AudioRecorder = require('node-audiorecorder');

// Constants.
const DIRECTORY = 'temp-recordings';

// Create path to write recordings to.
if (!fs.existsSync(DIRECTORY)) {
  fs.mkdirSync(DIRECTORY);
}

// Initialize recorder and file stream.
const audioRecorder = new AudioRecorder({
  program: 'sox',
  silence: 0
}, console);

// Log information on the following events.
audioRecorder.on('error', function () {
  console.warn('Recording error.');
});
audioRecorder.on('end', function () {
  console.warn('Recording ended.');
});

iniciaGravacao()
setTimeout(() => {
  paraGravacao()
}, 5000);

function iniciaGravacao(){
    const fileName = path.join(
      DIRECTORY,
      "Arquivo_De_Audio.wav"
    );
    console.log('Writing new recording file at:', fileName);
    const fileStream = fs.createWriteStream(fileName, { encoding: 'binary' });
    audioRecorder.start().stream().pipe(fileStream);
    console.log("INICIANDO GRAVAÇÃO!!!");
}

function paraGravacao(){
    audioRecorder.stop();
    console.log("PARANDO GRAVAÇÃO!!!");
}

module.exports = {
  iniciaGravacao, paraGravacao
}
