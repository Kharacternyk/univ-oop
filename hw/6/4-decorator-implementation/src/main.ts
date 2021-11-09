import {BareXMasTree} from "./bareXMasTree";
import {XMasTree} from "./xMasTree";
import {XMasTreeLightsDecorator} from "./xMasTreeLightsDecorator";
import {XMasTreeToyDecorator} from "./xMasTreeToyDecorator";

const bareTree = new BareXMasTree();
const withBall = new XMasTreeToyDecorator(bareTree, "ball");
const withStar = new XMasTreeToyDecorator(withBall, "star");
const withYellowLights = new XMasTreeLightsDecorator(withStar, "yellow");
const withSnowman = new XMasTreeToyDecorator(withYellowLights, "snowman");
const withBlueLights = new XMasTreeLightsDecorator(withSnowman, "blue");

withYellowLights.turnLightsOn();
withBlueLights.turnLightsOff();

const tree: XMasTree = withBlueLights;

console.log(tree.getAppearance());
