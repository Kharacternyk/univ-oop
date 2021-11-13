import {SearchStrategy} from "../src/SearchStrategy";
import {SaxSearchStrategy} from "../src/SaxSearchStrategy";
import fs from "fs/promises";

async function testSearchStrategy(strategy: SearchStrategy) {
    const xml = await fs.readFile("data/library.xml", {encoding: "utf-8"});
    const result = strategy.getNodeIds(xml, "Шкільняк");

    expect(result.length).toBe(3);
    expect(result).toContain("b1");
    expect(result).toContain("b2");
    expect(result).toContain("r3");
}

test("SAX search strategy", () => testSearchStrategy(new SaxSearchStrategy()));
