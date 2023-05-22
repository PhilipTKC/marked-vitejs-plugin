import { marked } from "marked";
import { Include } from "./enums";
export interface PluginOptions {
    marked: typeof marked;
    include: Include[];
}
export interface Mappings {
    [key: string]: string;
}
export interface Heading {
    level: number;
    text: string;
    slug: string;
}
