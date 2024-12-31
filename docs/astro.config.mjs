// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "CodeCage",
      social: {
        github: "https://github.com/gingerchew/code-cage",
      },
      sidebar: [
        {
          label: "Guides",
          items: [
            // Each item here is one entry in the navigation menu.
			{ "label": "Getting Started", slug: "guides/installation" }
          ],
        },
      ],
    }),
  ],
});
