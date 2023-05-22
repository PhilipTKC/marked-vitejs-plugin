import { marked } from "marked";
import { Include } from "./enums";
export interface PluginOptions {
    marked: typeof marked;
    include: Include[];
}
export interface ModuleExport {
    code: string | undefined;
    map: null;
}
export interface Mappings {
    [key: string]: string;
}
export interface Heading {
    level: number;
    text: string;
    slug: string;
}
export interface Plugin {
    name: string;
    enforce: string;
    transform: (code: any, id: string) => ModuleExport | undefined;
}
