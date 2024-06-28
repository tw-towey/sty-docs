import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "",
  description: "",
  ignoreDeadLinks: true,
  base: process.env.NODE_ENV === 'production' ? '/stydocs/' : '/',
  assetsDir: 'stydocs',
  outDir: 'stydocs',
  themeConfig: {
    // siteTitle: false,
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      {
        text: "首页",
        link: "http://p4ui.toweydoc.tech:20080",
      },
    ],

    sidebar: [
      {
        text: 'docker',
        collapsed: true,
        items: [
          { text: '01 Docker简介', link: '/docs/docker/01 Docker简介' },
          { text: '02 Docker安装', link: '/docs/docker/02 Docker安装' },
          { text: '03 镜像命令', link: '/docs/docker/03 镜像命令' },
          { text: '04 容器命令', link: '/docs/docker/04 容器命令' },
          { text: '05 其他命令', link: '/docs/docker/05 其他命令' },
          { text: '06 Docker平台架构', link: '/docs/docker/06 Docker平台架构' },
          { text: '07 容器数据卷', link: '/docs/docker/07 容器数据卷' },
          { text: '08 镜像仓库', link: '/docs/docker/08 镜像仓库' },
          { text: '09 Dockerfile', link: '/docs/docker/09 Dockerfile' },
          { text: '10 虚悬镜像', link: '/docs/docker/10 虚悬镜像' },
          { text: '11 Docker网络', link: '/docs/docker/11 Docker网络' },
          { text: '12 限制容器资源', link: '/docs/docker/12 限制容器资源' },
          { text: '13 Docker Compose', link: '/docs/docker/13 Docker Compose' },
          { text: 'Docker2022', link: '/docs/docker/Docker2022' }
        ]
      },
      {
        text: 'linux',
        collapsed: true,
        items: [ { text: 'linux', link: '/docs/linux/index' } ]
      },
      {
        text: 'nginx',
        collapsed: true,
        items: [ { text: 'nginx', link: '/docs/nginx/nginx' } ]
      },

    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
