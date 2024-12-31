// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  site: "https://gingerchew.github.io/",
  base: import.meta.env.DEV ? "" : "/code-cage",
  integrations: [
    starlight({
      title: "CodeCage",
      social: {
        github: "https://github.com/gingerchew/code-cage",
      },
      sidebar: [],
    }),
  ],
});
