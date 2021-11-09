import { XMasTree } from "./xMasTree";

export class XMasTreeToyDecorator implements XMasTree {
    private readonly tree: XMasTree;
    private readonly toy: string;

    public constructor(tree: XMasTree, toy: string) {
        this.tree = tree;
        this.toy = toy;
    }

    public getAppearance(): string {
        return `${this.tree.getAppearance()}\nWith a ${this.toy}`;
    }
}

