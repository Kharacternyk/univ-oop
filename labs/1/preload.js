const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("ipc", {
    handleEvaluated: handler => ipcRenderer.on("evaluated", handler),
    handleRejected: handler => ipcRenderer.on("rejected", handler),
    requestEvaluation: expression => ipcRenderer.send("evaluate", expression),
});
