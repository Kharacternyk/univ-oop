import {SearchStrategy} from "../src/SearchStrategy";
import {SaxSearchStrategy} from "../src/SaxSearchStrategy";
import {DomSearchStrategy} from "../src/DomSearchStrategy";
import {LinqSearchStrategy} from "../src/LinqSearchStrategy";
import fs from "fs/promises";

async function testSearchStrategy(strategy: SearchStrategy) {
    const xml = await fs.readFile("data/library.xml", {encoding: "utf-8"});
    const result = strategy.getNodeIds(xml, "Шкільняк");

    expect(result).toContain("b1");
    expect(result).toContain("b2");
    expect(result).toContain("r3");
    expect(result.length).toBe(3);
}

test("SAX search strategy", () => testSearchStrategy(new SaxSearchStrategy()));
test("DOM search strategy", () => testSearchStrategy(new DomSearchStrategy()));
test("LINQ search strategy", () => testSearchStrategy(new LinqSearchStrategy()));
