export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],
  devtools: { enabled: true },
  app: {
    head: {
      title: 'Daniela House',
      link: [
        { rel: 'icon', type: 'image/png', href: '/d.png' }
      ]
    }
  }
})