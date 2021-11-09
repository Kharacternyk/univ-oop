import { XMasTree } from "./xMasTree";

export class XMasTreeLightsDecorator implements XMasTree {
    private readonly tree: XMasTree;
    private readonly lightsColor: string;
    private areLightsOn: boolean;

    public constructor(tree: XMasTree, lightsColor: string) {
        this.tree = tree;
        this.lightsColor = lightsColor;
        this.areLightsOn = false;
    }

    public turnLightsOn() {
        this.areLightsOn = true;
    }

    public turnLightsOff() {
        this.areLightsOn = false;
    }

    public getAppearance(): string {
        return `${this.tree.getAppearance()}\n` +
            `With ${this.lightsColor} lights ${this.areLightsOn ? "on" : "off"}`;
    }
}

