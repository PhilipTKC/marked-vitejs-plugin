import { Plugin } from "vite";

import { Exporter } from './exporter';
import { PluginOptions } from './interfaces';

export { Include } from "./enums";

export { PluginOptions }

export default (pluginOptions: PluginOptions): Plugin => {
    const exporter = new Exporter(pluginOptions);

    return {
        name: 'marked-vite-plugin',
        enforce: 'pre',
        transform: (code: string, id: string) => exporter.transform(code, id),
    };
}