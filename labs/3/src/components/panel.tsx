import React, {useEffect, useState} from "react";
import {Box, Newline, Text, useInput} from "ink";
import {File} from "../file";
import {FileEditor} from "../file-editor";
import {FileTruncator} from "../file-truncator";
import {FileTagCleaner} from "../file-tag-cleaner";
import {Directory} from "../directory";
import {Entry} from "./entry";

interface Props {
    focused: boolean,
    selectedEntry: File | null,
    onEntrySelected: (entry: File) => void,
    onSelectedEntryChanged: () => void,
    onFileSystemChanged: () => void,
    fileSystemGeneration: number,
}

export const Panel = ({
    focused,
    selectedEntry,
    onEntrySelected,
    onSelectedEntryChanged,
    onFileSystemChanged,
    fileSystemGeneration,
}: Props) => {
    const [directory, setDirectory] = useState(Directory.getCurrent());
    const [entries, setEntries] = useState<Array<File>>([]);
    const [focusedIndex, setFocusedIndex] = useState(0);

    useEffect(() => {
        directory.list().then(entries => setEntries(entries.slice(0, 12)));
        setFocusedIndex(0);
    }, [directory, fileSystemGeneration]);

    useInput((input, key) => {
        const entry = entries[focusedIndex];

        switch (input) {
            case "k":
                setFocusedIndex(focusedIndex > 0 ? focusedIndex - 1 : 0);
                break;
            case "j":
                setFocusedIndex(
                    focusedIndex < entries.length - 1 ? focusedIndex + 1 : entries.length - 1
                );
                break;
            case "b":
                setDirectory(directory.getParent());
                break;
            case "c":
                if (selectedEntry) {
                    directory.copyHere(selectedEntry)
                    .then(onFileSystemChanged)
                    .catch(() => null);
                }
                break;
            case "m":
                if (selectedEntry) {
                    directory.moveHere(selectedEntry)
                    .then(onFileSystemChanged)
                    .catch(() => null);
                }
                break;
            case "d":
                selectedEntry?.remove().then(onFileSystemChanged).catch(() => null);
                break;
            case " ":
                if (entry) {
                    onEntrySelected(entry);
                }
                break;
            case "e":
                if (selectedEntry) {
                    const editor = new FileEditor();
                    editor.execute(selectedEntry)
                    .then(onFileSystemChanged)
                    .catch(() => null);
                }
                break;
            case "y":
                if (selectedEntry) {
                    directory.copyHere(selectedEntry)
                    .then(file => new FileTruncator().execute(file))
                    .then(onFileSystemChanged)
                    .catch(() => null);
                }
                break;
            case "t":
                if (selectedEntry) {
                    new FileTagCleaner().execute(selectedEntry)
                    .then(onSelectedEntryChanged)
                    .catch(() => null);
                }
                break;
            case "g":
                if (entry instanceof Directory) {
                    setDirectory(entry);
                }
                break;
        }
    }, {isActive: focused});

    const renderedEntries = entries.map((entry, index) =>
        <Entry key={entry.getPath()} focused={index === focusedIndex} file={entry} />
    );

    return (
        <Box flexDirection="column" flexGrow={1} flexBasis={0} margin={1}>
            <Text bold color="green" wrap="truncate-middle">{directory.getPath()}</Text>
            <Box
                borderStyle={focused ? "double" : "single"}
                borderColor={focused ? "cyan" : undefined}
            >
                <Text>
                    {renderedEntries}
                </Text>
            </Box>
        </Box>
    );
};
