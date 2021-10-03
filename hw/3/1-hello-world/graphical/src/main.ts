import { app, BrowserWindow } from "electron";

app.whenReady().then(() => {
    const window = new BrowserWindow();
    window.loadFile("index.html");
});
