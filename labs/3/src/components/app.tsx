import React, {useState} from "react";
import {useInput, Text} from "ink";
import {FullScreen} from "./full-screen";
import {Panel} from "./panel";

export const App = () => {
    const [firstPanelFocused, setFirstPanelFocused] = useState(true);

    useInput((input, key) => {
        switch (input) {
            case "h":
                setFirstPanelFocused(true);
                break;
            case "l":
                setFirstPanelFocused(false);
                break;
        }
    });

    return <>
        <FullScreen>
            <Panel focused={firstPanelFocused}></Panel>
            <Panel focused={!firstPanelFocused}></Panel>
        </FullScreen>
    </>;
};
