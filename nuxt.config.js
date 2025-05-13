export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      API_URL: process.env.NUXT_PUBLIC_API_URL || "http://localhost:8000/joint_angles/",
      CURRENT_STATE_URL: process.env.NUXT_PUBLIC_CURRENT_STATE_URL || "http://localhost:8000/joint_angles/update/",
      STREAM_URL : process.env.NUXT_PUBLIC_STREAM_URL || "http://192.168.29.105:8080/offer"
    },
  },
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