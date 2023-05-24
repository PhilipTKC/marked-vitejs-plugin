import { Plugin } from "vite";

import { MarkdownTransformer } from './transformer';
import { PluginOptions } from './interfaces';

export { Include } from "./enums";

export default (pluginOptions: PluginOptions): Plugin => {
    const transformer = new MarkdownTransformer(pluginOptions);

    return {
        name: 'marked-vite-plugin',
        enforce: 'pre',
        transform: (code: string, id: string) => transformer.transform(code, id),
    };
}