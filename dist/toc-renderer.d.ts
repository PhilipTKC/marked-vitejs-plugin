import { marked } from "marked";
import { Heading } from "./interfaces";
export declare class TOCRenderer {
    private headings;
    renderHeading(text: string, level: number, raw: string, slugger: marked.Slugger): string;
    returnTOC(): Heading[];
}
