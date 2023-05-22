import { marked } from "marked";

import { Heading } from "./interfaces";

export class TOCRenderer {

    private headings: Heading[] = [];

    renderHeading(text: string, level: number, raw: string, slugger: marked.Slugger): string {
        const slug = slugger.slug(raw);
        this.headings.push({ level, text, slug });
        return `<h${level} id="${slug}">${text}</h${level}>`;
    }

    returnTOC(): Heading[] {
        return this.headings;
    }
}