import { LinqTraversalStrategy } from "./LinqTraversalStrategy";
import { DomTraversalStrategy } from "./DomTraversalStrategy";
import { SaxTraversalStrategy } from "./SaxTraversalStrategy";
import { SearchEngine } from "./SearchEngine";

import { app, BrowserWindow, ipcMain, dialog } from "electron";
import { writeFileSync } from "fs";
import path from "path";

let window: BrowserWindow;

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

ipcMain.on("save", () => {
    const location = dialog.showSaveDialogSync({});
    if (location) {
        window.webContents.savePage(location, "HTMLComplete");
    }
});

app.whenReady().then(() => {
    window = new BrowserWindow({
        webPreferences: {
            contextIsolation: true,
            preload: path.join(app.getAppPath(), "preload.js")
        }
    });
    window.loadFile(path.join(app.getAppPath(), "data/library.xml"));
    window.setMenu(null);
});

