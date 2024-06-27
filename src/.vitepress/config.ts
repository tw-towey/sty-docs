import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "",
  description: "",
  ignoreDeadLinks: true,
  base: process.env.NODE_ENV === 'production' ? '/docs/' : '/',
  assetsDir: 'stydocs',
  outDir: 'stydocs',
  themeConfig: {
    // siteTitle: false,
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Docs', link: '/docs/' },
      {
        text: "首页",
        link: "http://p4ui.toweydoc.tech:20080",
      },
    ],

    sidebar: [
      {
        text: 'docker',
        collapsed: false,
        items: [
          { text: 'Docker2022', link: '/docs/docker/Docker2022' },
          // { text: 'K8S', link: '/docs/docker/K8S' }
        ]
      },

      {
        text: 'linux',
        collapsed: false,
        items: [ { text: 'index', link: '/docs/linux/index' } ]
      },
      {
        text: 'nginx',
        collapsed: false,
        items: [ { text: 'nginx', link: '/docs/nginx/nginx' } ]
      },

    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
