import React, {useEffect, useState, useRef} from "react";
import {Box, Newline, Text, measureElement} from "ink";
import {File} from "../file";
import {FileViewer} from "../file-viewer";

interface Props {
    file: File | null,
    fileViewer: FileViewer,
}

export const Viewer = ({file, fileViewer}: Props) => {
    const [lines, setLines] = useState<Array<string>>([]);

    useEffect(() => {
        if (file) {
            fileViewer.view(file).then(lines => setLines(lines)).catch(() => setLines([]));
        } else {
            setLines([]);
        }
    }, [file, fileViewer]);

    return lines.length ? (
        <Box margin={1} borderStyle="single" flexBasis={0} flexGrow={1}>
            <Text>
                {
                    lines.slice(0, 5).map(line =>
                        <Text wrap="truncate-end">{line}<Newline /></Text>
                    )
                }
            </Text>
        </Box>
    ) : null;
};
