import { Triangle } from "./triangle";
import { Circle } from "./circle";
import { Rectangle } from "./rectangle";
import { Square } from "./square";
import { Rhombus } from "./rhombus";

const triangle = new Triangle([3, 5, 7]);
const circle = new Circle(5);
const rectangle = new Rectangle([3, 7]);
const square = new Square(5);
const rhombus = new Rhombus(5, Math.PI / 6);

function printInfo(name, shape) {
    console.log(`${name}
    Perimeter: ${shape.getPerimeter()}
    Square: ${shape.getSquare()}`);
}

printInfo("Triangle", triangle);
printInfo("Circle", circle);
printInfo("Rectangle", rectangle);
printInfo("Square", square);
printInfo("Rhombus", rhombus);
