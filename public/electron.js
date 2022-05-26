const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const isDev = require("electron-is-dev");
const fsExtra = require('fs-extra');
const { ipcMain, dialog } = require("electron");
const tempDir = path.join(__dirname, "../src/temp-recordings");
const recorder = require('../src/js/recorder.js');
let tempFileName = path.join(recorder.tempDir, 'gravacao-temporaria.wav');

let options = {
  title: "Recker - Salvar gravação",
  defaultPath : "",
  buttonLabel : "Salvar",
  filters :[
   {name: 'Audio', extensions: ['wav']},
   {name: 'Custom File Type', extensions: ['as']},
   {name: 'All Files', extensions: ['*']}
  ]
}

function salvaArquivoDef(definitiveDir){
    const caminhoAntigo = tempFileName;
    const caminhoNovo = definitiveDir;
    fsExtra.move(caminhoAntigo, caminhoNovo, function (err) {
      if (err){
        return console.error(err)
      } else {
        console.log("Arquivo salvo");
        mainWindow.webContents.send("fromMain", true);
      }
    })
}

let mainWindow;
function createWindow() {
    var splash = new BrowserWindow({
        width: 800, 
        height: 400, 
        transparent: true, 
        frame: false, 
        alwaysOnTop: true 
    });

    splash.loadURL(`file://${path.join(__dirname, "/splash.html")}`);
    splash.center();

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

    mainWindow.loadURL(isDev ? "http://localhost:3000": 
        `file://${path.join(__dirname, "./index.html")}`);

    mainWindow.on("closed", () => (mainWindow = null));
    // mainWindow.setMenu(null);

    mainWindow.webContents.once('did-finish-load', function () {
        mainWindow.show();
        splash.close();
    });
}

function sair(){
    app.quit();
}

app.on("ready", function(){
    createWindow();
    // mainWindow.webContents.openDevTools();
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (mainWindow === null) {
        createWindow();
    }
});

ipcMain.on("toMain", (event, args) => {
    if(args.funcao === "sair"){
        sair();
    }
    if(args.funcao === "iniciarGravacao"){
        recorder.iniciaGravacao();
    }
    if(args.funcao === "pararGravacao"){
        recorder.paraGravacao();
    }
    if(args.funcao === "descartarGravacao"){
        recorder.descartaGravacao();  
    }
    if(args.funcao === "playTempRec"){
        player.playTempRec();
    } 
    if(args.funcao === "pauseTempRec"){
        player.pauseTempRec();
    } 
    if(args.funcao === "buscarTempFileName"){
        mainWindow.webContents.send("fromMain", recorder.tempFileName);
    } 
})

ipcMain.on("toMainAsync", async (event, args) => {
    if(args.funcao === "salvarArquivo"){
        //Salvando arquivo no diretório especificado pelo usuário
        let filename = (await dialog.showSaveDialog(mainWindow, options)).filePath;
        salvaArquivoDef(filename);
        
    }
})

module.exports = {
    isDev
}
