import { Triangle } from "./triangle";
import { EquilateralTriangle } from "./equilateralTriangle";

const t = new Triangle();

t.setA(3);
t.setB(4);
t.setC(5);

console.log(`Triangle
    Sides: ${[t.getA(), t.getB(), t.getC()]}
    Perimeter: ${t.getPerimeter()}
    Angles: ${[t.getAlpha(), t.getBeta(), t.getGamma()]}
`);

const et = new EquilateralTriangle();

et.setA(3);

console.log(`Equilateral Triangle
    Sides: ${[et.getA(), et.getB(), et.getC()]}
    Perimeter: ${et.getPerimeter()}
    Square: ${et.getSquare()}
    Angles: ${[et.getAlpha(), et.getBeta(), et.getGamma()]}
`);
