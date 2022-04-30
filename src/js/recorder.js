// Importação dos módulos
const fs = require('fs');
const fsExtra = require('fs-extra');
const path = require('path');
const AudioRecorder = require('node-audiorecorder');

// Criação do diretório de gravação temporário
// Ao finalizar a gravação, o usuário terá a opção de escolher onde salvar o arquivo, 
// o que moverá o arquivo do diretório temporário para o escolhido 
const tempDir = 'temp-recordings';
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir);
}

let definitiveDir = null;//path.join(__dirname, "teste.wav");
let tempFileName = path.join(tempDir, "gravacao-temporaria.wav");
let recState = false;

// Inicia o gravador
const audioRecorder = new AudioRecorder({
  program: 'sox', // Gravador utilizado, no caso o SoX 14.4.1
  silence: 0, // Tempo de silêncio ao fim da gravação
  channels: 1, // Quantidade de canais
  sampleRate: 16000, // Sample rate em Hz
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

function salvaArquivoDef(definitiveDir){
  const caminhoAntigo = tempFileName;
  const caminhoNovo = definitiveDir;
  fsExtra.move(caminhoAntigo, caminhoNovo, function (err) {
    if (err) return console.error(err)
    console.log("Arquivo salvo");
  })
}

function descartaGravacao(){
  fs.unlinkSync(tempFileName)
}

module.exports = {
  iniciaGravacao, paraGravacao, salvaArquivoDef, definitiveDir, descartaGravacao
}
