export default defineNuxtConfig({
  vue: {
    compilerOptions: {
      // Treat <primitive> as a custom element so Vue doesn't try to resolve it
      isCustomElement: tag => tag === 'primitive'
    }
  },

  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxt/image"
  ],

  css: [
    "@/assets/tailwind.css"
  ],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },

  build: {
    transpile: ["troisjs"]
  },

  components: true,

  app: {
    head: {
      title: "raas-frontend2",
      htmlAttrs: {
        lang: "en"
      },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { hid: "description", name: "description", content: "" },
        { name: "format-detection", content: "telephone=no" }
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" }
      ]
    }
  },

  compatibilityDate: "2025-02-20"
});