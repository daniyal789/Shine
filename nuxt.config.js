// Global page headers: https://go.nuxtjs.dev/config-head
 
  // Global CSS: https://go.nuxtjs.dev/config-css


  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  

  // Auto import components: https://go.nuxtjs.dev/config-components
  

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
 
    // https://go.nuxtjs.dev/tailwindcss

  // Modules: https://go.nuxtjs.dev/config-modules

  // Build Configuration: https://go.nuxtjs.dev/config-build

export default defineNuxtConfig({
  vue: {
    compilerOptions: {
      // Treat <primitive> as a custom element so Vue doesn't try to resolve it
      isCustomElement: tag => tag === 'primitive'
    }
  },
  define: {
    "process.env": {},
  },
  head: {
    title: 'raas-frontend2',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  css: [
    '@/assets/tailwind.css',
  ],

  build: {
    transpile: ["troisjs"],
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  },

  components: true,

  buildModules: [
    '@nuxtjs/tailwindcss',
  ],

  modules: ['@nuxt/image'],
  compatibilityDate: '2025-02-18',
});