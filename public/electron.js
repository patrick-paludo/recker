const recorder = require("../src/recorder");
const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const isDev = require("electron-is-dev");
const { ipcMain } = require("electron");

let mainWindow;

function createWindow() {
mainWindow = new BrowserWindow({ 
    width: 900, 
    height: 680, 
    fullscreen: false,
    webPreferences: {
        nodeIntegration: false, // is default value after Electron v5
        contextIsolation: true, // protect against prototype pollution
        enableRemoteModule: true, // turn off remote
        preload: path.join(__dirname, "preload.js") // use a preload script
    }
});
    mainWindow.loadURL(isDev ? "http://localhost:3000": 
        `file://${path.join(__dirname, "./index.html")}`);

    mainWindow.on("closed", () => (mainWindow = null));
    mainWindow.setMenu(null) 
}

function sair(){
    app.quit();
}

app.on("ready", function(){
    createWindow();
    mainWindow.webContents.openDevTools();
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
})