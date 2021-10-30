const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("ipc", {
    handleEvaluated: handler => ipcRenderer.on("evaluated", handler),
    handleLoaded: handler => ipcRenderer.on("loaded", handler),
    handleRejected: handler => ipcRenderer.on("rejected", handler),
    requestEvaluation: (cell, expression) => ipcRenderer.send("evaluate", cell, expression),
    requestSave: () => ipcRenderer.send("save"),
    requestLoad: () => ipcRenderer.send("load"),
});
