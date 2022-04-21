// Importação dos módulos
const fs = require('fs'),
  path = require('path');
const AudioRecorder = require('node-audiorecorder');

// Criação do diretório de gravação temporário
// Ao finalizar a gravação, o usuário terá a opção de escolher onde salvar o arquivo, 
// o que moverá o arquivo do diretório temporário para o escolhido 
const DIRECTORY = 'temp-recordings';
if (!fs.existsSync(DIRECTORY)) {
  fs.mkdirSync(DIRECTORY);
}

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
    const fileName = path.join(DIRECTORY, "gravacao-temporaria.wav");
    console.log('Salvando arquivo na pasta temporária:', fileName);
    // Cria filestream
    const fileStream = fs.createWriteStream(fileName, { encoding: 'binary' });
    // Inicia captura e gravação no arquivo
    audioRecorder.start().stream().pipe(fileStream);
    console.log("Iniciando gravação.");
}

// Função para finalizar e salvar a gravação
function paraGravacao(){
    // Para a captura e gravação do arquivo
    audioRecorder.stop();
    console.log("Finalizando gravação.");
}

module.exports = {
  iniciaGravacao, paraGravacao
}
