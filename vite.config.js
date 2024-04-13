// vite.config.js
import { resolve } from "path";
import { rssPlugin } from "vite-plugin-rss";
import { defineConfig } from "vite";

export default defineConfig({
  license: "MIT",
  build: {
    outDir: '../dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        blog: resolve(__dirname, "src/blog/index.html"),
      },
    },
  },
  root: 'src',
  plugins: [
    rssPlugin({
      mode: "define",
      items: [
        {
          title: "April 12th: Refactoring JavaScript Code",
          link: "https://laurensrousseau.ikdoeict.be/blog/#120424",
          pubDate: new Date("2024-04-12T00:00:00Z"),
        },
        {
          title: "April 11th: Cleaning Up the Code",
          link: "https://laurensrousseau.ikdoeict.be/blog/#110424",
          pubDate: new Date("2024-04-11T00:00:00Z"),
        },
        {
          title: "April 10th: Styling and Layout Improvements",
          link: "https://laurensrousseau.ikdoeict.be/blog/#100424",
          pubDate: new Date("2024-04-10T00:00:00Z"),
        },
        {
          title: "April 9th: Adding More Models",
          link: "https://laurensrousseau.ikdoeict.be/blog/#090424",
          pubDate: new Date("2024-04-09T00:00:00Z"),
        },
        {
          title: "April 8th: Fixing Positioning Issues",
          link: "https://laurensrousseau.ikdoeict.be/blog/#080424",
          pubDate: new Date("2024-04-08T00:00:00Z"),
        },
        {
          title: "April 5th: First Batch of 3D Models",
          link: "https://laurensrousseau.ikdoeict.be/blog/#050424",
          pubDate: new Date("2024-04-05T00:00:00Z"),
        },
        {
          title: "April 3rd: Diving Deeper into Three.js",
          link: "https://laurensrousseau.ikdoeict.be/blog/#030424",
          pubDate: new Date("2024-04-03T00:00:00Z"),
        },
        {
          title: "April 2nd: Starting My 3D Website Journey",
          link: "https://laurensrousseau.ikdoeict.be/blog/#020424",
          pubDate: new Date("2024-04-02T00:00:00Z"),
        },
      ],
      channel: {
        title: "Blog Rousseau",
        link: "https://laurensrousseau.ikdoeict.be/blog",
        description: "Blog of Laurens Rousseau",
      },
    }),
  ],
});
