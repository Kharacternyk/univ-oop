import { Lexer } from './lexer';
import { Parser } from './parser';
import { EvaluatorVisitor } from './evaluatorVisitor';

import {
    ANTLRInputStream,
    CommonTokenStream,
} from 'antlr4ts';

import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";

app.whenReady().then(() => {
    const window = new BrowserWindow({
        webPreferences: {
            contextIsolation: true,
            preload: path.join(app.getAppPath(), "preload.js")
        }
    });
    window.loadFile(path.join(app.getAppPath(), "index.html"));
});

function cellValueRetriever(cell) {
    return 0;
}

ipcMain.on("evaluate", (event, input) => {
    try {
        const inputStream = new ANTLRInputStream(input);
        const lexer = new Lexer(inputStream);
        const tokenStream = new CommonTokenStream(lexer);
        const parser = new Parser(tokenStream);
        const expression = parser.expression()
        const evaluator = new EvaluatorVisitor(cellValueRetriever);

        event.sender.send("evaluated", evaluator.visit(expression));
    } catch (error) {
        event.sender.send("rejected", error.message);
    }
});
