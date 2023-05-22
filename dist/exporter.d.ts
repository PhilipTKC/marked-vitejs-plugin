import { PluginOptions } from "./interfaces";
export declare class Exporter {
    private marked;
    private includes;
    constructor(pluginOptions: PluginOptions);
    transform(code: string, id: string): {
        code: string;
        map: null;
    } | undefined;
    private shouldTransformFile;
    private generateModuleCode;
}
