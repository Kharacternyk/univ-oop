import React, {useEffect, useState} from "react";
import {Box, Newline, Text, useInput} from "ink";
import {File} from "../file";
import {Directory} from "../directory";

interface Props {
    focused: boolean,
    file: File,
}

export const Entry = ({focused, file}: Props) => (
    <Text
        color={file instanceof Directory ? "blue" : undefined}
        inverse={focused}
        wrap="truncate-middle"
    >
        {file.getName()}
        <Newline />
    </Text>
)
