// Importação dos módulos
const fs = require('fs');
const path = require('path');
const AudioRecorder = require('node-audiorecorder');
const os = require('os');
const isDev = require("electron-is-dev");
const WaveFile = require('wavefile').WaveFile;

// Criação do diretório de gravação temporário
// Ao finalizar a gravação, o usuário terá a opção de escolher onde salvar o arquivo, 
// o que moverá o arquivo do diretório temporário para o escolhido 
// *
// Em desenvolvimento, cria pasta no diretório do projeto;
// Em produção, utiliza diretório temporário padrão do sistema operacional.
let tempDir = null;
if (isDev === true){
  tempDir = path.join(__dirname, "../temp-recordings");
} else {
  tempDir = path.join(os.tmpdir(), 'recker/temp-recordings')
}
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir,  { recursive: true });
}

let definitiveDir = null;//path.join(__dirname, "teste.wav");
let tempFileName = path.join(tempDir, "gravacao-temporaria.ogg");

// Inicia o gravador
const audioRecorder = new AudioRecorder({
  program: 'sox', // Gravador utilizado, no caso o SoX 14.4.1
  silence: 0, // Tempo de silêncio ao fim da gravação
  channels: 1, // Quantidade de canais
  sampleRate: 16000, // Sample rate em Hz
  type: `ogg`
}, console);

// Log de informações
audioRecorder.on('error', function () {
  console.warn('Erro de gravação.');
});
audioRecorder.on('end', function () {
  console.warn('Gravação finalizada');
});

// Função para iniciar a gravação
function iniciaGravacao(){
  // Define o diretório e nome do arquivo para salvamento na pasta temporária
  
  console.log('Salvando arquivo na pasta temporária:', tempFileName);
  // Cria filestream
  const fileStream = fs.createWriteStream(tempFileName, { encoding: 'binary' });
  // Inicia captura e gravação no arquivo
  audioRecorder.start().stream().pipe(fileStream);
  console.log("Iniciando gravação.");
  recState = true;
}

// Função para finalizar a gravação
function paraGravacao(){
  // Para a captura e gravação do arquivo
  audioRecorder.stop();
  recState = false;
  console.log("Finalizando gravação.");
}

function descartaGravacao(){
  if(fs.existsSync(tempFileName)){
    fs.unlinkSync(tempFileName)
  }
}

module.exports = {
  iniciaGravacao, paraGravacao, definitiveDir, descartaGravacao, tempDir, tempFileName
}
