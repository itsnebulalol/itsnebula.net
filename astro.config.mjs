import million from 'million/compiler';
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind({
    config: {
      applyBaseStyles: false
    }
  }), react()],
  vite: {
    plugins: [million.vite({ mode: 'react', server: true, auto: true })],
  },
  output: "server",
  adapter: node({
    mode: "standalone"
  })
})
