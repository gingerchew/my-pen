---
title: Installation
description: How to install and get started using CodeCage
---

CodeCage is a Web Component to generate a CodePen like code viewing experience.

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

- [ ] As an Astro Component (Though it should work just fine as a web component)
- [ ] Support for markdown codeblocks *[Help Wanted]*
- [ ] Syntax Highlighting ([Check out this css tricks article](https://css-tricks.com/css-custom-highlight-api-early-look/)) 
- [ ] Make styles more configurable (`::part`, `--cc-prop-name`) *[Help Wanted]*
- [ ] Take advantage of DSD somehow (goes for styles too)
