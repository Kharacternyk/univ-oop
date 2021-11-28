import React, {useEffect, useState} from "react";
import {Box, Newline, Text} from "ink";
import {listDirectory, File} from "../file-system-facade";

interface Props {
    focused: boolean,
}

export const Panel = ({focused}: Props) => {
    const [directory, setDirectory] = useState(".");
    const [entries, setEntries] = useState<Array<File>>([]);

    useEffect(() => {
        listDirectory(directory).then(entries => setEntries(entries));
    }, [directory]);

    const renderedEntries = entries.map(entry => <>
        <Text color={entry.isDirectory ? "blue" : "black"}>
            {entry.name}
        </Text>
        <Newline />
    </>);

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
