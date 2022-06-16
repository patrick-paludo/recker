// Importações e declarações de variáveis
const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const isDev = require("electron-is-dev");
const fsExtra = require('fs-extra');
const os = require("os");
const { ipcMain, dialog } = require("electron");
const recorder = require('../src/js/recorder.js');
const byteArrayConverter = require("../src/js/byteArrayConverter");
const lastRec = require("../src/js/lastRec.js");
let tempFileName = path.join(recorder.tempDir, 'gravacao-temporaria.wav');

// Função para salvar o arquivo de áudio
function salvaArquivoDef(definitiveDir){
    // Valida se o nome do arquivo possui extensão e ajusta
    if (path.extname(definitiveDir) !== '.wav') {
        definitiveDir = definitiveDir + '.wav';
    }

    lastRec.salvarUltimaGravacao(definitiveDir);

    const caminhoAntigo = tempFileName;
    const caminhoNovo = definitiveDir;

    // Salva o arquivo movendo a gravação temporária para o diretório definitivo
    fsExtra.move(caminhoAntigo, caminhoNovo, function (err) {
      if (err){
        return console.error(err)
      } else {
        console.log("Arquivo salvo");
        // Envia confirmação de salvamento para o processo renderer
        mainWindow.webContents.send("fromMain", "arquivoSalvo");
      }
    })
}

// Função para criar a janela principal da aplicação
let mainWindow;
function createWindow() {
    // Cria a janela da splash
    var splash = new BrowserWindow({
        width: 800, 
        height: 400, 
        transparent: true, 
        frame: false, 
        alwaysOnTop: true 
    });

    // Carrega o html da splash
    splash.loadURL(`file://${path.join(__dirname, "/splash.html")}`);
    splash.center();

    // Cria a janela principal
    mainWindow = new BrowserWindow({ 
        width: 900, 
        height: 680, 
        center: true,
        title: "Recker",
        fullscreen: false,
        frame: false,
        resizable: false,
        show: false,
        icon: path.join(__dirname, "./img/logo_recker_icone.ico"),
        webPreferences: {
            nodeIntegration: false, 
            contextIsolation: true,
            enableRemoteModule: true,
            preload: path.join(__dirname, "preload.js")
        }
    });

    // Carrega a janela principal
    // Em desenvolvimento, carrega a compilação de dev do React
    // Em produção, carrega o index.html
    mainWindow.loadURL(isDev ? "http://localhost:3000": 
        `file://${path.join(__dirname, "./index.html")}`);

    // Ao fechar a janela, descarrega a janela principal
    mainWindow.on("closed", () => (mainWindow = null));

    // Ao finalzar o carregamento da janela principal, 
    // esconde a splash e mostra a janela principal
    mainWindow.webContents.once('did-finish-load', function () {
        mainWindow.show();
        splash.close();
    });
}

// Função para sair da aplicação
function sair(){
    app.quit();
}

// Cria a janela principal quando o electron estiver pronto
app.on("ready", function(){
    createWindow();
});

// Quando o usuário fechar a janela, fecha a aplicação
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

// Cria a janela principal quando o electron for 
// aberto novamente se a janela não existir
app.on("activate", () => {
    if (mainWindow === null) {
        createWindow();
    }
});

// Listener para as funções síncronas da renderer para main
ipcMain.on("toMain", (event, args) => {
    // Fechar aplicação
    if(args.funcao === "sair"){
        sair();
    }
    // Iniciar gravação
    if(args.funcao === "iniciarGravacao"){
        recorder.iniciaGravacao();
    }
    // Parar gravação
    if(args.funcao === "pararGravacao"){
        recorder.paraGravacao();
    }
    // Descartar gravação
    if(args.funcao === "descartarGravacao"){
        recorder.descartaGravacao();  
    }
    // Converter gravação em byte array e enviar para a renderer
    if(args.funcao === "buscarTempFileName"){
        var fileToByteArray;
        if(isDev === true){
            fileToByteArray = path.join(__dirname, "../src/temp-recordings/gravacao-temporaria.wav");
        }else{
            fileToByteArray = path.join(os.tmpdir(), 'recker/temp-recordings/gravacao-temporaria.wav')
        }
        mainWindow.webContents.send("fromMain", byteArrayConverter.getAsByteArray(fileToByteArray));
    }
    if(args.funcao === "buscarGravacoes"){
        var args = ['gravacaoBuscada', lastRec.getUltimasGravacoes()];
        mainWindow.webContents.send("fromMain", args);  
    }
})

// Listener para as funções assíncronas da renderer para main
ipcMain.on("toMainAsync", async (event, args) => {
    if(args.funcao === "salvarArquivo"){
        //Salvar arquivo no diretório especificado pelo usuário
        let filename = (await dialog.showSaveDialog(mainWindow, {
            title: "Recker - Salvar gravação",
            defaultPath : "",
            buttonLabel : "Salvar",
            filters :[{
                name: 'Audio', 
                extensions: ['wav']
            }]
          }
        )).filePath;
        salvaArquivoDef(filename);
    }
    if(args.funcao === "buscarArquivo"){
        //Buscar arquivo no diretório especificado pelo usuário e retornar como byteArray   
        var fileToByteArray = (await dialog.showOpenDialog({ 
            properties: ['openFile'],
            title: "Recker - Abrir áudio",
            buttonLabel : "Abrir",
            filters: [{
                name: 'Audio',
                extensions: ['wav']
              }]
        })).filePaths[0];
        // Pegar nome do arquivo aberto
        var fileName = path.basename(fileToByteArray);
        var args = ['arquivoBuscado', byteArrayConverter.getAsByteArray(fileToByteArray), fileName];
        mainWindow.webContents.send("fromMain", args);  
    }
})
