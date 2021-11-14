import {TraversalStrategy} from "../src/TraversalStrategy";
import {SaxTraversalStrategy} from "../src/SaxTraversalStrategy";
import {DomTraversalStrategy} from "../src/DomTraversalStrategy";
import {LinqTraversalStrategy} from "../src/LinqTraversalStrategy";
import fs from "fs/promises";

async function testTraversalStrategy(strategy: TraversalStrategy) {
    const xml = await fs.readFile("data/library.xml", {encoding: "utf-8"});
    const result = strategy.getNodeIds(xml, /Шкільняк/u);

    expect(result).toContain("b1");
    expect(result).toContain("b2");
    expect(result).toContain("r3");
    expect(result.length).toBe(3);
}

test("SAX search strategy", () => testTraversalStrategy(new SaxTraversalStrategy()));
test("DOM search strategy", () => testTraversalStrategy(new DomTraversalStrategy()));
test("LINQ search strategy", () => testTraversalStrategy(new LinqTraversalStrategy()));
