"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Exporter = void 0;
const gray_matter_1 = __importDefault(require("gray-matter"));
const toc_renderer_1 = require("./toc-renderer");
const enums_1 = require("./enums");
class Exporter {
    constructor(pluginOptions) {
        const { marked, include } = pluginOptions;
        this.marked = marked;
        this.includes = include;
    }
    transform(code, id) {
        if (this.shouldTransformFile(id, ".md")) {
            const { content, data: attributes } = (0, gray_matter_1.default)(code);
            return this.generateModuleCode(attributes, content);
        }
    }
    shouldTransformFile(id, fileType) {
        return id.endsWith(fileType);
    }
    generateModuleCode(attributes, content) {
        const toc = new toc_renderer_1.TOCRenderer();
        const renderer = new this.marked.Renderer();
        const slugger = new this.marked.Slugger();
        if (this.includes.includes(enums_1.Include.TOC)) {
            renderer.heading = (text, level, raw) => toc.renderHeading(text, level, raw, slugger);
        }
        let renderedHTML;
        if (this.includes.includes(enums_1.Include.HTML)) {
            renderedHTML = this.marked.parse(content, { renderer });
        }
        const includeMappings = {
            [enums_1.Include.YAML]: `export const ${[enums_1.Include.YAML]} = ${JSON.stringify(attributes)};`,
            [enums_1.Include.TOC]: `export const ${[enums_1.Include.TOC]} = ${JSON.stringify(toc.returnTOC())};`,
            [enums_1.Include.HTML]: `export const ${[enums_1.Include.HTML]} = ${JSON.stringify(renderedHTML)};`,
        };
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
exports.Exporter = Exporter;
