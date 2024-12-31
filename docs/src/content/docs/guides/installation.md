---
title: Installation
description: How to install and get started using MyPen
---

MyPen is a Web Component to generate a CodePen like code viewing experience.

## Install

```sh
pnpm add code-cage
```

### Usage

```html
<code-cage use-slots>
  <span slot="html">{{my_html_snippet}}</span>
  <span slot="css">{{my_css_snippet}}</span>
  <span slot="js">{{my_js_snippet}}</span>
</code-cage>
<!-- Or using attributes -->
<code-cage
  html="{{my_html_snippet}}"
  css="{{my_css_snippet}}"
  js="{{my_js_snippet}}"
></code-cage>
```

> Make sure you include the script somewhere in your site.

## To do

- [ ] As an Astro Component
- [ ] Support for markdown codeblocks
- [ ] Syntax Highlighting (looking for article with example)
- [ ] Make styles more configurable (`::part`, `--cc-prop-name`)
- [ ] Take advantage of DSD somehow (goes for styles too)
