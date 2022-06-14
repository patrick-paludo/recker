// Importações e declarações de variáveis
const {
    contextBridge,
    ipcRenderer
} = require("electron");

// Expõe métodos de forma protegida para o renderer 
// utilizar o ipcRenderer sem expor todo o objeto
contextBridge.exposeInMainWorld(
    "api", {
        send: (channel, data) => {
            // Canais liberados para o renderer
            let validChannels = ["toMain"];
            if (validChannels.includes(channel)) {
                ipcRenderer.send(channel, data);
            }
        },
        receive: (channel, func) => {
            let validChannels = ["fromMain"];
            if (validChannels.includes(channel)) {
                ipcRenderer.on(channel, (event, ...args) => func(...args));
            }
        },
        sendAsync: (channel, data) => {
            let validChannels = ["toMainAsync"];
            if (validChannels.includes(channel)) {
                ipcRenderer.send(channel, data);
            }
        },
        receiveAsync: (channel, func) => {
            let validChannels = ["fromMainsync"];
            if (validChannels.includes(channel)) {
                ipcRenderer.on(channel, (event, ...args) => func(...args));
            }
        },
    }
);
