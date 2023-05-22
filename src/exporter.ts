import { marked as M } from "marked";
import matter from "gray-matter";

import { TOCRenderer } from "./toc-renderer";

import { Include } from "./enums";
import { Mappings, ModuleExport, PluginOptions } from "./interfaces";

export class Exporter {

    private marked: typeof M;

    private includes: Include[];

    constructor(pluginOptions: PluginOptions) {
        const { marked, include } = pluginOptions;
        this.marked = marked;
        this.includes = include;
    }

    transform(code: string, id: string): ModuleExport | undefined {
        if (this.shouldTransformFile(id, ".md")) {
            const { content, data: attributes } = matter(code);

            return this.generateModuleCode(attributes, content);
        }
    }

    private shouldTransformFile(id: string, fileType: string): boolean {
        return id.endsWith(fileType);
    }

    private generateModuleCode(attributes: unknown, content: string) {

        const toc = new TOCRenderer();
        const renderer = new this.marked.Renderer();
        const slugger = new this.marked.Slugger();

        if (this.includes.includes(Include.TOC)) {
            renderer.heading = (text, level, raw) => toc.renderHeading(text, level, raw, slugger);
        }

        let renderedHTML;

        if (this.includes.includes(Include.HTML)) {
            renderedHTML = this.marked.parse(content, { renderer });
        }

        const includeMappings = {
            [Include.YAML]: `export const ${[Include.YAML]} = ${JSON.stringify(attributes)};`,
            [Include.TOC]: `export const ${[Include.TOC]} = ${JSON.stringify(toc.returnTOC())};`,
            [Include.HTML]: `export const ${[Include.HTML]} = ${JSON.stringify(renderedHTML)};`,
        } as Mappings;

        const moduleCode = this.includes
            .filter((option) => includeMappings.hasOwnProperty(option))
            .map((option) => includeMappings[option])
            .join('\n');

        return {
            code: moduleCode,
            map: null,
        };
    }
}