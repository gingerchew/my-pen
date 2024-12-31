import { MyPen } from "./class";

export const define = (localName = "my-pen") =>
  customElements.define(localName, MyPen);
