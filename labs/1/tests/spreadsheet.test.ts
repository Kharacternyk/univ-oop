import { Spreadsheet } from "../src/spreadsheet";

test("a spreadsheet evaluates a single cell", () => {
    const sheet = new Spreadsheet();
    const listener = (cell, value) => {
        if (cell == "A1") {
            expect(value).toBe(42);
        }
    };

    sheet.listen(listener);
    sheet.setExpression("A1", "42");
});

test("a spreadsheet evaluates a dependant cell", () => {
    const sheet = new Spreadsheet();
    const listener = (cell, value) => {
        if (cell == "B1") {
            expect(value).toBe(42);
        }
    };

    sheet.listen(listener);
    sheet.setExpression("A1", "42");
    sheet.setExpression("B1", "A1");
});

test("a spreadsheet reevaluates a dependant cell", () => {
    const sheet = new Spreadsheet();
    const listener = (cell, value) => {
        if (cell == "B1") {
            expect(value).toBe(4);
        }
    };

    sheet.setExpression("A1", "1");
    sheet.setExpression("B1", "A1 * A1");

    sheet.listen(listener);
    sheet.setExpression("A1", "2");
});

test("a spreadsheet throws on an undefined cell", () => {
    const sheet = new Spreadsheet();

    expect(() => sheet.setExpression("A1", "B1")).toThrow();
});
