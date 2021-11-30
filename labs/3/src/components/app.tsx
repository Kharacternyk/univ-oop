import React, {useState} from "react";
import {useInput, Text, Box} from "ink";
import {FullScreen} from "./full-screen";
import {Panel} from "./panel";
import {File} from "../file";

export const App = () => {
    const [firstPanelFocused, setFirstPanelFocused] = useState(true);
    const [selectedEntry, setSelectedEntry] = useState<File|null>(null);
    const [fileSystemGeneration, setFileSystemGeneration] = useState(0);

    const clearEntry = () => {
        setSelectedEntry(null);
    };

    const incrementGeneration = () => {
        clearEntry();
        setFileSystemGeneration(fileSystemGeneration + 1);
    };

    useInput((input, key) => {
        switch (input) {
            case "h":
                setFirstPanelFocused(true);
                break;
            case "l":
                setFirstPanelFocused(false);
                break;
            case "u":
                setSelectedEntry(null);
                break;
        }
    });

    return (
        <FullScreen>
            <Box justifyContent="center">
                <Text bold color="yellowBright">
                    {selectedEntry?.getPath()}
                </Text>
            </Box>
            <Box>
                <Panel
                    focused={firstPanelFocused}
                    selectedEntry={selectedEntry}
                    onEntrySelected={setSelectedEntry}
                    onFileSystemChanged={incrementGeneration}
                    fileSystemGeneration={fileSystemGeneration}
                />
                <Panel
                    focused={!firstPanelFocused}
                    selectedEntry={selectedEntry}
                    onEntrySelected={setSelectedEntry}
                    onFileSystemChanged={incrementGeneration}
                    fileSystemGeneration={fileSystemGeneration}
                />
            </Box>
        </FullScreen>
    );
};
