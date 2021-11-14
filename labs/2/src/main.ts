import { LinqTraversalStrategy } from "./LinqTraversalStrategy";
import { DomTraversalStrategy } from "./DomTraversalStrategy";
import { SaxTraversalStrategy } from "./SaxTraversalStrategy";
import { SearchEngine } from "./SearchEngine";

import { app, BrowserWindow, ipcMain, dialog } from "electron";
import path from "path";

ipcMain.on("search", (event, query, strategyType, searchOptions) => {
    let strategy;
    switch (strategyType) {
        case "LINQ": strategy = new LinqTraversalStrategy(); break;
        case "DOM": strategy = new DomTraversalStrategy(); break;
        case "SAX": strategy = new SaxTraversalStrategy(); break;
    }
    const engine = new SearchEngine("data/library.xml", strategy, searchOptions);

    try {
        event.sender.send("search", engine.getNodeIds(query));
    } catch (error) {
        dialog.showErrorBox("Error", error.message);
    }
});

app.whenReady().then(() => {
    const window = new BrowserWindow({
        webPreferences: {
            contextIsolation: true,
            preload: path.join(app.getAppPath(), "preload.js")
        }
    });
    window.loadFile(path.join(app.getAppPath(), "data/library.xml"));
    window.setMenu(null);
});

