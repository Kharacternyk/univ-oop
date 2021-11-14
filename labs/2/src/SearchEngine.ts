import {TraversalStrategy} from "./TraversalStrategy";
import {QueryInterpreter} from "./QueryInterpreter";
import {RegexQueryInterpreter} from "./RegexQueryInterpreter";
import {LiteralQueryInterpreter} from "./LiteralQueryInterpreter";
import {WholeWordQueryInterpreterDecorator} from "./WholeWordQueryInterpreterDecorator";
import {
    CaseInsensitiveQueryInterpreterDecorator
} from "./CaseInsensitiveQueryInterpreterDecorator";

import fs from "fs";

export type SearchOptions = {
    regex: boolean,
    caseSensitive: boolean,
    wholeWord: boolean,
};

export class SearchEngine {
    private readonly xmlPath: string;
    private readonly traversalStrategy: TraversalStrategy;
    private readonly interpreter: QueryInterpreter;

    public constructor(
        xmlPath: string,
        traversalStrategy: TraversalStrategy,
        searchOptions: SearchOptions,
    ) {
        this.xmlPath = xmlPath;
        this.traversalStrategy = traversalStrategy;

        if (searchOptions.regex) {
            this.interpreter = new RegexQueryInterpreter();
        } else {
            this.interpreter = new LiteralQueryInterpreter();
        }

        if (!searchOptions.caseSensitive) {
            this.interpreter = new CaseInsensitiveQueryInterpreterDecorator(this.interpreter);
        }

        if (searchOptions.wholeWord) {
            this.interpreter = new WholeWordQueryInterpreterDecorator(this.interpreter);
        }
    }

    public getNodeIds(query: string): Array<string> {
        const regex = this.interpreter.getRegex(query);
        const xml = fs.readFileSync(this.xmlPath, {encoding: "utf-8"});

        return this.traversalStrategy.getNodeIds(xml, regex);
    }
}
