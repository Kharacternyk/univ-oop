import React, {useEffect, useState} from "react";
import {Box, Newline, Text, useInput} from "ink";
import {File} from "../file-system-facade";

interface Props {
    focused: boolean,
    file: File,
}

export const Entry = ({focused, file}: Props) => <>
    <Text
        color={file.isDirectory ? "blue" : undefined}
        inverse={focused}
        wrap="truncate-middle"
    >
        {file.name}
    </Text>
    <Newline />
</>
