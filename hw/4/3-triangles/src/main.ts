import { IsoscelesTriangle } from "./isoscelesTriangle";
import { RightTriangle } from "./rightTriangle";

const it = new IsoscelesTriangle(3, Math.PI / 6);
const rt = new RightTriangle(3, 4);

function printInfo(name, shape) {
    console.log(`${name}
    Perimeter: ${shape.getPerimeter()}
    Square: ${shape.getSquare()}`);
}

printInfo("IsoscelesTriangle", it);
printInfo("RightTriangle", rt);
