export interface TraversalStrategy {
    getNodeIds(xml: string, regex: RegExp): Array<string>;
}
