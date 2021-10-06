import { Converter } from "./converter";

import { createInterface } from "readline";

const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
});

const converter = new Converter(26.5, 30.5);

function convert() {
    rl.question("What conversion are you interested in? ", input => {
        const [valueString, source, preposition, target] = input.split(" ");
        if (!valueString) {
            return rl.close();
        }
        if (preposition !== "to") {
            return convert();
        }
        
        const value = Number(valueString);
        let result;
        switch (`${source.toUpperCase()}:${target.toUpperCase()}`) {
            case "EUR:UAH": result = converter.convertFromEur(value); break;
            case "USD:UAH": result = converter.convertFromUsd(value); break;
            case "UAH:EUR": result = converter.convertToEur(value); break;
            case "UAH:USD": result = converter.convertToUsd(value); break;
        }

        console.log(result);
        return convert();
    });
}

convert();
