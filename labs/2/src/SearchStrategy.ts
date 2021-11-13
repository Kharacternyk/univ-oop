export interface SearchStrategy {
    getNodeIds(xml: string, query: string): Array<string>;
}
