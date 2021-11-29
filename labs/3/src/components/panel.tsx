import React, {useEffect, useState} from "react";
import {Box, Newline, Text, useInput} from "ink";
import {
    resolvePath,
    getCurrentDirectory,
    listDirectory,
    changeDirectory,
    File
} from "../file-system-facade";
import {Entry} from "./entry";

interface Props {
    focused: boolean,
    onEntrySelected: (entry: File) => void;
}

export const Panel = ({focused, onEntrySelected}: Props) => {
    const [directory, setDirectory] = useState(getCurrentDirectory());
    const [entries, setEntries] = useState<Array<File>>([]);
    const [focusedIndex, setFocusedIndex] = useState<number>(0);

    useEffect(() => {
        listDirectory(directory).then(entries => {
            setFocusedIndex(0);
            setEntries(entries);
            changeDirectory(directory);
        });
    }, [directory]);

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
            case " ":
                const entry = entries[focusedIndex];
                if (entry.isDirectory) {
                    setDirectory(resolvePath(entries[focusedIndex].name));
                } else {
                    onEntrySelected(entry);
                }
                break;
        }
    });

    const renderedEntries = entries.map((entry, index) => <>
        <Entry focused={index === focusedIndex} file={entry} />
    </>);

    return <>
        <Box flexDirection="column" flexGrow={1} flexBasis={0} margin={1}>
            <Text bold color="green" wrap="truncate-middle">{directory}</Text>
            <Box
                borderColor={focused ? "red" : undefined}
                padding={1}
                borderStyle="bold"
            >
                <Text>
                    {renderedEntries}
                </Text>
            </Box>
        </Box>
    </>;
};
