import {TraversalStrategy} from "./TraversalStrategy";
import {xml2js} from "xml-js";
import Enumerable from "linq";

export class LinqTraversalStrategy implements TraversalStrategy {
    public getNodeIds(xml: string, regex: RegExp) {
        const dom:any = xml2js(xml, {compact: true});

        const bookIds = Enumerable
            .from(dom.library.books.book)
            .where((book: any) => regex.test(book.title._text)
                               || regex.test(book.author._text)
                               || book.tags.tag.some((tag: any) => regex.test(tag._text)))
            .select((book: any) => book.id._text);

        const readerIds = Enumerable
            .from(dom.library.readers.reader)
            .where((reader: any) => regex.test(reader.name._text)
                                 || regex.test(reader.faculty._text)
                                 || regex.test(reader.position._text))
            .select((reader: any) => reader.id._text);

        return Array.from(bookIds).concat(Array.from(readerIds)) as Array<string>;
    }
}
