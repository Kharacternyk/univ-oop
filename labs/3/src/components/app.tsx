import React, {useState} from "react";
import {useInput, Text, Box} from "ink";
import {FullScreen} from "./full-screen";
import {Panel} from "./panel";
import {File} from "../file-system-facade";

export const App = () => {
    const [firstPanelFocused, setFirstPanelFocused] = useState(true);
    const [selectedEntry, setSelectedEntry] = useState<File|null>(null);

    useInput((input, key) => {
        switch (input) {
            case "h":
                setFirstPanelFocused(true);
                break;
            case "l":
                setFirstPanelFocused(false);
                break;
            case "d":
                setSelectedEntry(null);
                break;
        }
    });

    return <>
        <FullScreen>
            <Box justifyContent="center">
                <Text bold color="redBright">
                    {selectedEntry ? "[ "+selectedEntry.name+" ]" : null}
                </Text>
            </Box>
            <Box>
                <Panel focused={firstPanelFocused} onEntrySelected={setSelectedEntry}/>
                <Panel focused={!firstPanelFocused} onEntrySelected={setSelectedEntry}/>
            </Box>
        </FullScreen>
    </>;
};
