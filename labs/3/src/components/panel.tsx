import React, {useEffect, useState} from "react";
import {Box, Newline, Text, useInput} from "ink";
import {listDirectory, changeDirectory, File} from "../file-system-facade";

interface Props {
    focused: boolean,
}

export const Panel = ({focused}: Props) => {
    const [directory, setDirectory] = useState(".");
    const [entries, setEntries] = useState<Array<File>>([]);
    const [focusedIndex, setFocusedIndex] = useState(0);

    useEffect(() => {
        listDirectory(directory).then(entries => {
            setEntries(entries);
            changeDirectory(directory);
        });
    }, [directory]);

    useInput((input, key) => {
        if (!focused) {
            return
        }

        switch (input) {
            case "k":
                setFocusedIndex(focusedIndex > 0 ? focusedIndex - 1 : 0);
                break;
            case "j":
                setFocusedIndex(
                    focusedIndex < entries.length - 1 ? focusedIndex + 1 : entries.length
                );
                break;
            case " ":
                setDirectory(entries[focusedIndex].name);
                break;
        }
    });

    const renderedEntries = entries.map((entry, index) => {
        return <>
            <Text
                color={entry.isDirectory ? "blue" : undefined}
                inverse={index === focusedIndex}
            >
                {entry.name}
            </Text>
            <Newline />
        </>
    });

    return <>
        <Box
            borderColor={focused ? "red" : undefined}
            width="50px"
            padding={1}
            margin={1}
            borderStyle="round"
        >
            <Text>
                {renderedEntries}
            </Text>
        </Box>
    </>;
};
