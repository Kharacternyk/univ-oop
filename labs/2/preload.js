const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("ipc", {
    handleSearch: handler => ipcRenderer.on("search", handler),
    requestSearch: (query, strategyType, searchOptions) =>
        ipcRenderer.send("search", query, strategyType, searchOptions),
});
