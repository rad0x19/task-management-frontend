import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
export default defineNuxtConfig({
  ssr : false,
  devtools: { enabled: true },
  compatibilityDate: "2024-09-04",
  build: {
    transpile: ['vuetify'],
  },
  css : [
    '@mdi/font/css/materialdesignicons.min.css',
    'sweetalert2/src/sweetalert2.scss',
  ],
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    '@pinia/nuxt',
    '@nuxt-alt/proxy',
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  // @ts-ignore
  proxy : {
      proxies : {
          '^/api/.*' : {
              target : "http://1210exam.test/api",
              changeOrigin : true,
              secure : false,
              rewrite: (path : any) => path.replace(/^\/api/, '')
          },
          '^/attachments/.*' : {
              target : "http://1210exam.test/storage/attachments",
              changeOrigin : true,
              secure : false,
              rewrite: (path : any) => path.replace(/^\/attachments/, '')
          }
      }
  }
}) 