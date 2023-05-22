"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TOCRenderer = void 0;
class TOCRenderer {
    constructor() {
        this.headings = [];
    }
    renderHeading(text, level, raw, slugger) {
        const slug = slugger.slug(raw);
        this.headings.push({ level, text, slug });
        return `<h${level} id="${slug}">${text}</h${level}>`;
    }
    returnTOC() {
        return this.headings;
    }
}
exports.TOCRenderer = TOCRenderer;
