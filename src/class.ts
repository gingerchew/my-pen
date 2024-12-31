let instanceId = 0;
const styles = new CSSStyleSheet();
styles.replaceSync(`
:host {
    --color: light-dark(#121314, #fafaff);
    --bg: light-dark(#fafaff, #121314);
    --results-bg: light-dark(#eee, #333);
    --border: 1px solid light-dark(#efeffa, #2121224);
    display: grid;
    grid-template-columns: 1fr 1fr;
    background-color: var(--bg);
    padding: 1ch;
    gap: 1ch;
    font-family: sans-serif;
}
.d-none {
    display: none;
}
p {
    grid-column: 1/-1;
    color: var(--color);
    font-size: 1.5rem;
    margin: 0;
}
iframe {
    width: 100%;
    height: 100%;
    border: unset;
}
ul {
    display: grid;
    grid-template-columns: 2fr 1fr;
    justify-content: space-between;
    gap: 1ch;
    padding: 0;
    margin: 0;
    list-style-type: none;
}
.content-type {
    grid-template-columns: repeat(3, auto);
    justify-content: start;
}
li {
    grid-column: span 1;
}
button {
    background-color: var(--bg);;
    color: var(--color);
    padding: 1ch 1.5ch;
    border: var(--border);
    border-radius: 1ch;
}
.results {
    background-color: var(--results-bg);
    padding: 1ch;
    border-radius: 1ch;
    border: var(--border);
}
.output {
    color: var(--color);
}
li:has(.copy) {
    justify-self: end;
}
`);
export class CodeCage extends HTMLElement {
  frame?: HTMLIFrameElement;
  // escape html
  e(str: string) {
    return str.replaceAll(/</g, "&lt;");
  }
  get useSlots() {
    return this.hasAttribute("use-slots");
  }
  get html(): string {
    return this.useSlots
      ? this.$('[slot="html"]', true)!.textContent!
      : this.getAttribute("html") || "";
  }
  get css(): string {
    return this.useSlots
      ? this.$('[slot="css"]', true)!.textContent!
      : this.getAttribute("css") || "";
  }
  get js(): string {
    return this.useSlots
      ? this.$('[slot="js"]', true)!.textContent!
      : this.getAttribute("js") || "";
  }
  get title() {
    return this.getAttribute("title") || "";
  }
  get src() {
    let { html, css, js } = this;
    console.log({ html, css, js });
    return `<!doctype html>
    <head>
        <style>${css}</style>
    </head>
    <body>
        ${html}
        <script type="module">
        ${js}
        </script>
    </body>
    </html>
    `;
  }
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.id = `myPen${++instanceId}`;
  }
  $ = <T extends Element>(selector: string, useHost = false) =>
    (!useHost ? (this.shadowRoot ?? this) : this).querySelector<T>(selector);
  $$ = <T extends Element>(selector: string, useHost = false) =>
    Array.from(
      (!useHost ? (this.shadowRoot ?? this) : this).querySelectorAll<T>(
        selector
      )
    );

  createFrame() {
    this.$<HTMLIFrameElement>("iframe")!.src =
      `data:text/html;charset=utf-8,${encodeURI(this.src)}`;
  }
  async handleEvent(e: PointerEvent) {
    const target = (e.target as HTMLButtonElement).closest("button");
    if (!target) return;

    if (target.matches(".copy")) {
      const content = this.$<HTMLDivElement>(
        ".output:not(.d-none)"
      )!.textContent!;
      await navigator.clipboard.writeText(content);
      return;
    }

    const tab = this.$<HTMLDivElement>(
      `#${this.id}_${target.textContent?.toLowerCase()}`
    );

    this.$$<HTMLDivElement>(".output").forEach(el =>
      el.classList.toggle("d-none", !Object.is(el, tab))
    );
  }

  connectedCallback() {
    const html = this.useSlots
      ? `<slot name="html"></slot>`
      : `<pre><code>${this.e(this.html)}</code></pre>`;
    const css = this.useSlots
      ? `<slot name="css"></slot>`
      : `<pre><code>${this.e(this.css)}</code></pre>`;
    const js = this.useSlots
      ? `<slot name="js"></slot>`
      : `<pre><code>${this.e(this.js)}</code></pre>`;

    this.shadowRoot!.innerHTML = `
      <div part="host">
        <p class="title" part="title">${this.title}</p>
        <iframe part="iframe"></iframe>
        <div class="results" part="results">
            <ul role="list" class="controls" part="controls">
                <li>
                    <ul class="content-type" part="content-type">
                        <li>
                            <button type="button" part="button">HTML</button>
                        </li>
                        <li>
                            <button type="button" part="button">CSS</button>
                        </li>
                        <li>
                            <button type="button" part="button">JS</button>
                        </li>
                    </ul>
                </li>
                <li>
                    <button type="button" class="copy" part="button">Copy</button>
                </li>
            </ul>
            <div class="output" id="${this.id}_html" part="output">${html}</div>
            <div class="output d-none" id="${this.id}_css" part="output">${css}</div>
            <div class="output d-none" id="${this.id}_js" part="output">${js}</div>
        </div>
      </div>`;

    this.shadowRoot!.adoptedStyleSheets.push(styles);
    if (this.hasAttribute("dark")) {
      const darkMode = new CSSStyleSheet();
      darkMode.replaceSync(`:host { color-scheme: dark }`);
      this.shadowRoot!.adoptedStyleSheets.push(darkMode);
    }
    this.createFrame();
    this.shadowRoot!.addEventListener("click", this, true);
  }
  disconnectedCallback() {
    this.shadowRoot!.removeEventListener("click", this, true);
  }
}
