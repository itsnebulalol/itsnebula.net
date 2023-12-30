import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import million from 'million/compiler';
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";

export default defineConfig({
  site: 'https://itsnebula.net',
  integrations: [tailwind({
    config: {
      applyBaseStyles: false
    }
  }), react(), sitemap(), icon()],
  vite: {
    plugins: [million.vite({
      mode: 'react',
      server: true,
      auto: true
    })]
  }
});