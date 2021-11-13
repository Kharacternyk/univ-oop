import {SearchStrategy} from "./SearchStrategy";
import {xml2js} from "xml-js";
import Enumerable from "linq";

export class LinqSearchStrategy implements SearchStrategy {
    public getNodeIds(xml: string, query: string) {
        const dom:any = xml2js(xml, {compact: true});

        const bookIds = Enumerable
            .from(dom.library.books.book)
            .where((book: any) => book.title._text.includes(query)
                               || book.author._text.includes(query)
                               || book.tags.tag.some((tag: any) => tag._text.includes(query)))
            .select((book: any) => book.id._text);

        const readerIds = Enumerable
            .from(dom.library.readers.reader)
            .where((reader: any) => reader.name._text.includes(query)
                                 || reader.faculty._text.includes(query)
                                 || reader.position._text.includes(query))
            .select((reader: any) => reader.id._text);

        return Array.from(bookIds).concat(Array.from(readerIds)) as Array<string>;
    }
}
