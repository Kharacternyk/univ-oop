import { Spreadsheet } from "./spreadsheet";

import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";

const sheet = new Spreadsheet();

ipcMain.on("evaluate", (event, cell, expression) => {
    try {
        sheet.listen((cell, value) => event.sender.send("evaluated", cell, value));
        sheet.setExpression(cell, expression);
        sheet.unlisten();
    } catch (error) {
        event.sender.send("rejected", cell, error.message);
    }
});

app.whenReady().then(() => {
    const window = new BrowserWindow({
        webPreferences: {
            contextIsolation: true,
            preload: path.join(app.getAppPath(), "preload.js")
        }
    });
    window.loadFile(path.join(app.getAppPath(), "index.html"));
});

