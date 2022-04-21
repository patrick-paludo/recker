// Imports modules.
const fs = require('fs'),
  path = require('path');
const AudioRecorder = require('node-audiorecorder');

// Constants.
const DIRECTORY = 'examples-recordings';

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




// Create file path with random name.
const fileName = path.join(
  DIRECTORY,
  "Arquivo_De_Audio.wav"
);
console.log('Writing new recording file at:', fileName);


function iniciaGravacao(){
    const fileStream = fs.createWriteStream(fileName, { encoding: 'binary' });
    audioRecorder.start().stream().pipe(fileStream);
}

function paraGravacao(){
    audioRecorder.stop();
}

