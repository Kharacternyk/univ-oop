"use strict";

let rows = 0;
let columns = 0;

document.getElementById("table").addEventListener("keydown", event => {
    if (event.key === "Enter") {
        if (event.target.readOnly) {
            event.target.readOnly = false;
            event.target.dataset.value = event.target.value;
            event.target.value = event.target.dataset.expression;
        } else {
            event.target.readOnly = true;
            event.target.dataset.expression = event.target.value;

            ipc.requestEvaluation(event.target.dataset.cell, event.target.value);
        }
    }
});

ipc.handleEvaluated((event, cell, value) => {
    const input = document.querySelector(`[data-cell=${cell}]`);
    input.dataset.value = value;
    if (input.readOnly) {
        input.value = value;
    }
    input.classList.remove("error");
});

ipc.handleLoaded((event, cell, value, expression) => {
    const input = document.querySelector(`[data-cell=${cell}]`);
    input.dataset.expression = expression;
    input.dataset.value = input.value = value;
    input.readOnly = true;
    input.classList.remove("error");
});

ipc.handleRejected((event, cell, message) => {
    const input = document.querySelector(`[data-cell=${cell}]`);
    input.dataset.value = message;
    if (input.readOnly) {
        input.value = message;
    }
    input.classList.add("error");
});

document.getElementById("save").addEventListener("click", event => ipc.requestSave());

document.getElementById("load").addEventListener("click", event => ipc.requestLoad());

document.getElementById("addRow").addEventListener("click", event => {
    ++rows;

    const row = document.createElement("div");
    row.classList.add("row");

    const header = document.createElement("input");
    header.readOnly = true;
    header.value = rows;

    row.appendChild(header);

    for (let i = 0; i < columns; ++i) {
        const cell = document.createElement("input");
        cell.spellCheck = false;
        cell.dataset.cell = String.fromCharCode(i + "A".charCodeAt(0)) + rows;
        row.appendChild(cell);
    }

    document.getElementById("table").appendChild(row);
});

document.getElementById("addColumn").addEventListener("click", event => {
    const header = document.getElementById("table").children[0];
    const cell = document.createElement("input");
    cell.readOnly = true;
    cell.value = String.fromCharCode(columns + "A".charCodeAt(0));
    header.appendChild(cell);

    for (let i = 0; i < rows; ++i) {
        const row = document.getElementById("table").children[i + 1];
        const cell = document.createElement("input");
        cell.spellCheck = false;
        cell.dataset.cell = String.fromCharCode(columns + "A".charCodeAt(0)) + (i + 1);
        row.appendChild(cell);
    }

    ++columns;
});

document.getElementById("addColumn").click();
document.getElementById("addRow").click();

