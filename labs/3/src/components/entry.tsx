import React, {useEffect, useState} from "react";
import {Box, Newline, Text, useInput} from "ink";
import {File} from "../file";
import {Directory} from "../directory";
import {FileTypeDecorator} from "../file-type-decorator";

interface Props {
    focused: boolean,
    file: File,
}

export const Entry = ({focused, file}: Props) => {
    const [color, setColor] = useState<string|undefined>(undefined);

    const typedFile = new FileTypeDecorator(file);

    useEffect(() => {
        const checkType = async () => {
            if (await typedFile.isDirectory()) {
                setColor("blue");
            } else if (await typedFile.isMultilingual()) {
                setColor("green");
            }
        }

        checkType();
    }, [file]);

    return (
        <Text
            color={color}
            inverse={focused}
            wrap="truncate-middle"
        >
            {typedFile.getName()}
            <Newline />
        </Text>
    );
}
