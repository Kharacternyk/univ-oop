import React, {useEffect, useState} from "react";
import {Box, Newline, Text, useInput} from "ink";
import {File} from "../file";
import {Directory} from "../directory";
import {Entry} from "./entry";

interface Props {
    focused: boolean,
    selectedEntry: File | null,
    onEntrySelected: (entry: File) => void,
    onFileSystemChanged: () => void,
    fileSystemGeneration: number,
}

export const Panel = ({
    focused,
    selectedEntry,
    onEntrySelected,
    onFileSystemChanged,
    fileSystemGeneration,
}: Props) => {
    const [directory, setDirectory] = useState(Directory.getCurrent());
    const [entries, setEntries] = useState<Array<File>>([]);
    const [focusedIndex, setFocusedIndex] = useState(0);

    useEffect(() => {
        directory.list().then(setEntries);
        setFocusedIndex(0);
    }, [directory, fileSystemGeneration]);

    useInput((input, key) => {
        if (!focused) {
            return;
        }

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
                onEntrySelected(entries[focusedIndex]);
                break;
            case "g":
                const entry = entries[focusedIndex];
                if (entry instanceof Directory) {
                    setDirectory(entry);
                }
                break;
        }
    });

    const renderedEntries = entries.map((entry, index) =>
        <Entry key={entry.getPath()} focused={index === focusedIndex} file={entry} />
    );

    return (
        <Box flexDirection="column" flexGrow={1} flexBasis={0} margin={1}>
            <Text bold color="green" wrap="truncate-middle">{directory.getPath()}</Text>
            <Box
                borderStyle={focused ? "double" : "single"}
                borderColor={focused ? "cyan" : undefined}
                padding={1}
                flexGrow={1}
            >
                <Text>
                    {renderedEntries}
                </Text>
            </Box>
        </Box>
    );
};
