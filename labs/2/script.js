"use strict";

document.getElementById("search").addEventListener("keydown", event => {
    if (event.key === "Enter") {
        ipc.requestSearch(event.target.value);
    }
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
