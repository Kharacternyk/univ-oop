"use strict";

function requestSearch() {
    const query = document.getElementById("query").value;
    const strategy = document.getElementById("strategy").value;
    const searchOptions = {
        regex: document.getElementById("regex").checked,
        caseSensitive: document.getElementById("caseSensitive").checked,
        wholeWord: document.getElementById("wholeWord").checked,
    }
    ipc.requestSearch(query, strategy, searchOptions);
}

document.getElementById("query").addEventListener("keydown", event => {
    if (event.key === "Enter") {
        requestSearch();
    }
});

document.getElementById("search").addEventListener("click", event => {
    requestSearch();
});

document.getElementById("save").addEventListener("click", event => {
    ipc.requestSave();
});

ipc.handleSearch((event, rowIds) => {
    for (const row of document.querySelectorAll("tbody tr")) {
        row.style.display = "none";
    }
    for (const rowId of rowIds) {
        const row = document.getElementById(rowId);
        if (row) {
            row.style.display = "table-row";
        }
    }
});
