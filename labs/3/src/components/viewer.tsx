import React, {useEffect, useState, useRef} from "react";
import {Box, Newline, Text, measureElement} from "ink";
import {File} from "../file";
import {FileViewer} from "../file-viewer";

interface Props {
    title: string,
    file: File | null,
    fileViewer: FileViewer,
    fileGeneration: number,
}

export const Viewer = ({title, file, fileViewer, fileGeneration}: Props) => {
    const [lines, setLines] = useState<Array<string>>([]);

    useEffect(() => {
        if (file) {
            fileViewer.view(file).then(lines => setLines(lines)).catch(() => setLines([]));
        } else {
            setLines([]);
        }
    }, [file, fileViewer, fileGeneration]);

    return lines.length ? (
        <Box flexDirection="column" flexGrow={1} flexBasis={0} margin={1}>
            <Text bold color="green" wrap="truncate-middle">{title}</Text>
            <Box borderStyle="single">
                <Text>
                    {
                        lines.slice(0, 12).map(line =>
                            <Text wrap="truncate-end">{line}<Newline /></Text>
                        )
                    }
                </Text>
            </Box>
        </Box>
    ) : null;
};
