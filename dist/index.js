"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Include = void 0;
const exporter_1 = require("./exporter");
var enums_1 = require("./enums");
Object.defineProperty(exports, "Include", { enumerable: true, get: function () { return enums_1.Include; } });
exports.default = (pluginOptions) => {
    const exporter = new exporter_1.Exporter(pluginOptions);
    return {
        name: 'marked-vite-plugin',
        enforce: 'pre',
        transform: (code, id) => exporter.transform(code, id),
    };
};
