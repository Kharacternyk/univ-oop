import { Spreadsheet } from "./spreadsheet";

import { app, BrowserWindow, ipcMain, dialog } from "electron";
import { writeFileSync, readFileSync } from "fs";
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

ipcMain.on("load", event => {
    const [location] = dialog.showOpenDialogSync({});
    if (location) {
        const serialized = readFileSync(location, "utf8");
        try {
            sheet.setListener((cell, value, expression) => {
                event.sender.send("loaded", cell, value, expression);
            });
            sheet.fromString(serialized);
        } catch (error) {
            dialog.showErrorBox("Cannot open the file", error.message);
        }
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

