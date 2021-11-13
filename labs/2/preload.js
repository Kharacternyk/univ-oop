const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("ipc", {
    handleSearch: handler => ipcRenderer.on("search", handler),
    requestSearch: query => ipcRenderer.send("search", query),
});
