import { LinqSearchStrategy } from "./LinqSearchStrategy";

import { app, BrowserWindow, ipcMain, dialog } from "electron";
import fs from "fs";
import path from "path";

const strategy = new LinqSearchStrategy();
const xml = fs.readFileSync("data/library.xml", {encoding: "utf-8"});

ipcMain.on("search", (event, query) => {
    event.sender.send("search", strategy.getNodeIds(xml, query));
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
    window.webContents.openDevTools();
});

