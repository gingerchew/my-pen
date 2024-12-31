import { CodeCage } from "./class";

export const define = (localName = "code-cage") =>
  customElements.define(localName, CodeCage);
