import React, {useEffect, useState} from "react";
import {Box, Newline, Text, useInput} from "ink";
import {File} from "../file";
import {Directory} from "../directory";
import {Entry} from "./entry";

interface Props {
    focused: boolean,
    onEntrySelected: (entry: File) => void;
}

export const Panel = ({focused, onEntrySelected}: Props) => {
    const [directory, setDirectory] = useState<Directory>(Directory.getCurrent());
    const [entries, setEntries] = useState<Array<File>>([]);
    const [focusedIndex, setFocusedIndex] = useState<number>(0);

    useEffect(() => {
        directory.list().then(entries => {
            setFocusedIndex(0);
            setEntries(entries);
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
            case "b":
                setDirectory(directory.getParent());
                break;
            case " ":
                const entry = entries[focusedIndex];
                if (entry instanceof Directory) {
                    setDirectory(entry);
                } else {
                    onEntrySelected(entry);
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
                borderColor={focused ? "red" : undefined}
                padding={1}
                borderStyle="bold"
            >
                <Text>
                    {renderedEntries}
                </Text>
            </Box>
        </Box>
    );
};
