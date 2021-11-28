import React, {useState} from "react";
import {useInput, Text} from "ink";
import {FullScreen} from "./full-screen";
import {Panel} from "./panel";

export const App = () => {
    const [firstPanelFocused, setFirstPanelFocused] = useState(true);

    useInput((input, key) => {
        if (key.leftArrow) {
            setFirstPanelFocused(true);
        } else if (key.rightArrow) {
            setFirstPanelFocused(false);
        }
    });

    return <>
        <FullScreen>
            <Panel focused={firstPanelFocused}></Panel>
            <Panel focused={!firstPanelFocused}></Panel>
        </FullScreen>
    </>;
};
