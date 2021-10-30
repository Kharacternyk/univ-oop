import { Spreadsheet } from "./spreadsheet";

import { app, BrowserWindow, ipcMain, dialog } from "electron";
import { writeFileSync } from "fs";
import path from "path";

const sheet = new Spreadsheet();

ipcMain.on("evaluate", (event, cell, expression) => {
    try {
        sheet.setListener((cell, value) => event.sender.send("evaluated", cell, value));
        sheet.setExpression(cell, expression);
    } catch (error) {
        event.sender.send("rejected", cell, error.message);
    }
});

ipcMain.on("save", () => {
    const location = dialog.showSaveDialogSync({});
    if (location) {
        writeFileSync(location, sheet.toString());
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

