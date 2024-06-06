import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import pages from "vite-plugin-pages";
import layout from "vite-plugin-vue-layouts";
import graphql from "@rollup/plugin-graphql";
import components from "unplugin-vue-components/vite";

import path from "path";

// https://vitejs.dev/config/
export default ({ mode }) => {
  const env = { ...loadEnv(mode, process.cwd()) };
  return defineConfig({
    server: {
      port: env.VITE_PORT,
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    plugins: [
      vue({
        script: {
          refSugar: true,
        },
      }),
      graphql(),
      components(),
      pages(),
      layout(),
    ],
  });
};
