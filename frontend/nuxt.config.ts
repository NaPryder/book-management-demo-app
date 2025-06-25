// https://nuxt.com/docs/api/configuration/nuxt-config
import Components from 'unplugin-vue-components/vite';
import MotionResolver from 'motion-v/resolver';
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({

  modules: [
    '@nuxt/icon',
    '@nuxt/test-utils',
    '@nuxt/image',
    '@nuxt/eslint',
    '@nuxt/scripts',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
    'shadcn-nuxt',
    'motion-v/nuxt',
    'shadcn-nuxt',
    '@vueuse/nuxt',
  ],
  icon: {
    mode: 'css',
    cssLayer: 'base',
    customCollections: [
      {
        prefix: 'Icon',
        dir: './assets/icons',
      },
    ],
  },
  devtools: { enabled: true },
  css: [
    '~/assets/css/main.css',
  ],
  runtimeConfig: {
    public: {
      backendServerUrl: '',
    },
  },
  compatibilityDate: '2025-05-15',
  vite: {
    vue: {
      customElement: true,
    },
    plugins: [
      tailwindcss(),
      Components({
        dts: true,
        resolvers: [
          MotionResolver(),
        ],
      }),
    ],
  },
  eslint: {
    config: {
      stylistic: {
        indent: 2,
        semi: true,
        quotes: 'single',
      },
    },
  },
  googleFonts: {
    families: {
      'Sansation': [400, 700],
      'Open+Sans': true,
    },
    display: 'swap',
    download: true,
    inject: true,
  },
  shadcn: {
    prefix: 'Ui',
    componentDir: './components/ui'
  }

});