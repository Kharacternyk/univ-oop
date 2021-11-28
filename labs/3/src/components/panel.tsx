import React, {useEffect, useState} from "react";
import {Box, Newline, Text, useInput} from "ink";
import {listDirectory, File} from "../file-system-facade";

interface Props {
    focused: boolean,
}

export const Panel = ({focused}: Props) => {
    const [directory, setDirectory] = useState(".");
    const [entries, setEntries] = useState<Array<File>>([]);
    const [focusedIndex, setFocusedIndex] = useState(0);

    useEffect(() => {
        listDirectory(directory).then(entries => setEntries(entries));
    }, [directory]);

    useInput((input, key) => {
        if (key.upArrow) {
            setFocusedIndex(focusedIndex > 0 ? focusedIndex - 1 : 0);
        } else if (key.downArrow) {
            setFocusedIndex(
                focusedIndex < entries.length - 1 ? focusedIndex + 1 : entries.length
            );
        }
    });

    const renderedEntries = entries.map((entry, index) => {
        return <>
            <Text color={entry.isDirectory ? "blue" : "black"}>
                {(index === focusedIndex ? "> " : "") + entry.name}
            </Text>
            <Newline />
        </>
    });

    return <>
        <Box
            borderColor={focused ? "red" : "black"}
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
