import {QueryInterpreter} from "../src/QueryInterpreter";
import {RegexQueryInterpreter} from "../src/RegexQueryInterpreter";
import {LiteralQueryInterpreter} from "../src/LiteralQueryInterpreter";
import {WholeWordQueryInterpreterDecorator} from "../src/WholeWordQueryInterpreterDecorator";
import {
    CaseInsensitiveQueryInterpreterDecorator
} from "../src/CaseInsensitiveQueryInterpreterDecorator";

test("literal query interpreter finds special characters", () => {
    const interpreter = new LiteralQueryInterpreter();
    const regex = interpreter.getRegex("d+[bє]");

    expect(regex.test("d+[bє]")).toBe(true);
    expect(regex.test("dddє")).toBe(false);
});

test("regex query interpreter interprets special characters", () => {
    const interpreter = new RegexQueryInterpreter();
    const regex = interpreter.getRegex("d+[bє]");

    expect(regex.test("d+[bє]")).toBe(false);
    expect(regex.test("dddє")).toBe(true);
});

test("whole word decorator can decorate literal query interpreter", () => {
    let interpreter: QueryInterpreter;
    interpreter = new LiteralQueryInterpreter();
    interpreter = new WholeWordQueryInterpreterDecorator(interpreter);

    const regex = interpreter.getRegex("d+[bє]");

    expect(regex.test("word d+[bє] слово")).toBe(true);
    expect(regex.test("d+[bє]")).toBe(true);
    expect(regex.test("prefixd+[bє]")).toBe(false);
    expect(regex.test("d+[bє]suffix")).toBe(false);
});

test("whole word decorator can decorate regex query interpreter", () => {
    let interpreter: QueryInterpreter;
    interpreter = new RegexQueryInterpreter();
    interpreter = new WholeWordQueryInterpreterDecorator(interpreter);

    const regex = interpreter.getRegex("d+[bє]");

    expect(regex.test("word dddє слово")).toBe(true);
    expect(regex.test("dddє")).toBe(true);
    expect(regex.test("prefixdddє")).toBe(false);
    expect(regex.test("dddєsuffix")).toBe(false);
});

test("whole word decorator can decorate case insensitive decorator", () => {
    let interpreter: QueryInterpreter;
    interpreter = new RegexQueryInterpreter();
    interpreter = new CaseInsensitiveQueryInterpreterDecorator(interpreter);
    interpreter = new WholeWordQueryInterpreterDecorator(interpreter);

    const regex = interpreter.getRegex("D+[bЄ]");
    expect(regex.test("word DdDє слово")).toBe(true);
    expect(regex.test("dddB")).toBe(true);
    expect(regex.test("prefixdddB")).toBe(false);
    expect(regex.test("dddBsuffix")).toBe(false);
});
