import { ModuleExport, PluginOptions } from "./interfaces";
export declare class Exporter {
    private marked;
    private includes;
    constructor(pluginOptions: PluginOptions);
    transform(code: string, id: string): ModuleExport | undefined;
    private shouldTransformFile;
    private generateModuleCode;
}
