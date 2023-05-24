import matter from "gray-matter";

import { TOCRenderer } from "./toc-renderer";
import { Include } from "./enums";
import { Mappings, PluginOptions } from "./interfaces";

export class MarkdownTransformer {

    constructor(private pluginOptions: PluginOptions) { }

    transform(code: string, id: string) {
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
        const renderer = new this.pluginOptions.marked.Renderer();
        const slugger = new this.pluginOptions.marked.Slugger();

        if (this.pluginOptions.include.includes(Include.TOC)) {
            renderer.heading = (text, level, raw) => toc.renderHeading(text, level, raw, slugger);
        }

        let renderedHTML;

        if (this.pluginOptions.include.includes(Include.HTML)) {
            renderedHTML = this.pluginOptions.marked.parse(content, { renderer });
        }

        const includeMappings = {
            [Include.YAML]: `export const ${Include.YAML} = ${JSON.stringify(attributes)};`,
            [Include.TOC]: `export const ${Include.TOC} = ${JSON.stringify(toc.returnTOC())};`,
            [Include.HTML]: `export const ${Include.HTML} = ${JSON.stringify(renderedHTML)};`,
        } as Mappings;

        const moduleCode = this.pluginOptions.include
            .filter((option) => includeMappings.hasOwnProperty(option))
            .map((option) => includeMappings[option])
            .join('\n');

        return {
            code: moduleCode,
            map: null,
        };
    }
}