const recorder = require("../src/js/recorder");
const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const isDev = require("electron-is-dev");
const { ipcMain, dialog } = require("electron");


let options = {
  title: "Recker - Salvar gravação",
  defaultPath : "C:\\",
  buttonLabel : "Salvar",
  filters :[
   {name: 'Audio', extensions: ['wav']},
   {name: 'Custom File Type', extensions: ['as']},
   {name: 'All Files', extensions: ['*']}
  ]
}

let mainWindow;
function createWindow() {
mainWindow = new BrowserWindow({ 
    width: 900, 
    height: 680, 
    fullscreen: false,
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
    if(args.funcao === "salvarArquivo"){
        
        //Salvando arquivo no diretório especificado pelo usuário
        
    }
})

ipcMain.on("toMainAsync", async (event, args) => {
    if(args.funcao === "salvarArquivo"){
        let filename = (await dialog.showSaveDialog(mainWindow, options)).filePath;
        recorder.salvaArquivoDef(filename);
    }
})

