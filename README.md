# `<code-cage>`

A CodePen-like web component for showing off your code.

```js
import { define } from 'code-cage';
define();
```

```html
<code-cage use-slots dark>
    <span slot="html">{html_string_syntax_highlighted}</span>
    <span slot="css">{css_string_syntax_highlighted}</span>
    <span slot="js">{js_string_syntax_highlighted}</span>
</code-cage>
<!-- Or if you don't use syntax highlighting -->
 <code-cage dark html="{html_string}" css="{css_string}" js="{js_string}"></code-cage>
```

Also available as an Astro component:

```astro
---
import CodeCage from 'code-cage/astro';
import { Code } from 'astro:components';
---
<CodeCage dark>
    <Code slot="html" lang="html" code="..." />
    <Code slot="css" lang="css" code="..." />
    <Code slot="js" lang="js" code="..." />
</CodeCage>
```

[See the docs](https://gingerchew.github.io/code-cage);
