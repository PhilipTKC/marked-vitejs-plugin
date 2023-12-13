# Marked Vite Plugin

Use [Marked](https://github.com/markedjs/marked) in Vite.

## Usage

```js
// marked.config.js
import { marked } from 'marked';
import { markedHighlight } from "marked-highlight";
import hljs from 'highlight.js';

const markedConfig = {
    gfm: true
};

const highlightConfig = {
    langPrefix: 'hljs language-',
    highlight(code, lang) {
        const language = hljs.getLanguage(lang) ? lang : 'plaintext';
        return hljs.highlight(code, { language }).value;
    }
};

marked.use(markedConfig);
marked.use(markedHighlight(highlightConfig));

export default marked;
```

```js
// vite.config.js
import markedVitePlugin, { Include } from ""; // Not published, Import from dist.
import markedConfig from "./marked.config";

export default {
  plugins: [
    markedVitePlugin({
      marked: markedConfig,
      include: [Include.HTML, Include.YAML, Include.TOC]
    }),
  ]
}
```

```ts
// markdown.d.ts
declare module '*.md' {
  export const YAML: Record<string, unknown>;

  export const TOC: { level: number; text: string; slug: string; }[]

  export const HTML: string;
}

```
