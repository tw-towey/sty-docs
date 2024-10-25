import { defineConfig } from 'vitepress'
import LinuxRte from "./linuxRoute"
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "",
  description: "",
  ignoreDeadLinks: true,
  base: process.env.NODE_ENV === 'production' ? '/stydocs/' : '/',
  assetsDir: 'stydocs',
  outDir: 'stydocs',
  themeConfig: {
    outline: 3,
    // siteTitle: false,
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      {
        text: "首页",
        link: "http://p6ui.toweydoc.tech:20080",
      },
    ],

    sidebar: [
      {
        text: "books",
        collapsed: true,
        items: [
          {
            text: "01 know1",
            link: "/docs/books/01 know1.md",
          },
          {
            text: "02 know2",
            link: "/docs/books/02 know2.md",
          },
          {
            text: "03 es6",
            link: "/docs/books/03 es6.md",
          },
        ],
      },
      {
        text: "docker",
        collapsed: true,
        items: [
          {
            text: "01 Docker简介",
            link: "/docs/docker/01 Docker简介.md",
          },
          {
            text: "02 Docker安装",
            link: "/docs/docker/02 Docker安装.md",
          },
          {
            text: "03 镜像命令",
            link: "/docs/docker/03 镜像命令.md",
          },
          {
            text: "04 容器命令",
            link: "/docs/docker/04 容器命令.md",
          },
          {
            text: "05 其他命令",
            link: "/docs/docker/05 其他命令.md",
          },
          {
            text: "06 Docker平台架构",
            link: "/docs/docker/06 Docker平台架构.md",
          },
          {
            text: "07 容器数据卷",
            link: "/docs/docker/07 容器数据卷.md",
          },
          {
            text: "08 镜像仓库",
            link: "/docs/docker/08 镜像仓库.md",
          },
          {
            text: "09 Dockerfile",
            link: "/docs/docker/09 Dockerfile.md",
          },
          {
            text: "10 虚悬镜像",
            link: "/docs/docker/10 虚悬镜像.md",
          },
          {
            text: "11 Docker网络",
            link: "/docs/docker/11 Docker网络.md",
          },
          {
            text: "12 限制容器资源",
            link: "/docs/docker/12 限制容器资源.md",
          },
          {
            text: "13 Docker Compose",
            link: "/docs/docker/13 Docker Compose.md",
          },
          {
            text: "Docker2022",
            link: "/docs/docker/Docker2022.md",
          },
        ],
      },
      {
        text: "iwalgorithm",
        collapsed: true,
        items: [
          {
            text: "01  栈 从简单栈到单调栈，解决经典栈问题",
            link: "/docs/iwalgorithm/01  栈 从简单栈到单调栈，解决经典栈问题.md",
          },
          {
            text: "02  队列 FIFO 队列与单调队列的深挖与扩展",
            link: "/docs/iwalgorithm/02  队列 FIFO 队列与单调队列的深挖与扩展.md",
          },
          {
            text: "03  优先级队列 堆与优先级队列，筛选最优元素",
            link: "/docs/iwalgorithm/03  优先级队列 堆与优先级队列，筛选最优元素.md",
          },
          {
            text: "04  链表 如何利用“假头、新链表、双指针”解决链表题(上）",
            link: "/docs/iwalgorithm/04  链表 如何利用“假头、新链表、双指针”解决链表题(上）.md",
          },
          {
            text: "05  链表 如何利用“假头、新链表、双指针”解决链表题（下）",
            link: "/docs/iwalgorithm/05  链表 如何利用“假头、新链表、双指针”解决链表题（下）.md",
          },
          {
            text: "06  树 如何深度运用树的遍历",
            link: "/docs/iwalgorithm/06  树 如何深度运用树的遍历.md",
          },
          {
            text: "07  并查集 如何利用两行代码写并查集",
            link: "/docs/iwalgorithm/07  并查集 如何利用两行代码写并查集.md",
          },
          {
            text: "08  排序 如何利用合并与快排的小技巧解决算法难题",
            link: "/docs/iwalgorithm/08  排序 如何利用合并与快排的小技巧解决算法难题.md",
          },
          {
            text: "09  二分搜索 为什么说有序皆可用二分",
            link: "/docs/iwalgorithm/09  二分搜索 为什么说有序皆可用二分.md",
          },
          {
            text: "10  双指针 如何掌握最长、定长、最短区间问题的解题决窍",
            link: "/docs/iwalgorithm/10  双指针 如何掌握最长、定长、最短区间问题的解题决窍.md",
          },
          {
            text: "11  贪心 这种思想，没有模板，如何才能掌握它",
            link: "/docs/iwalgorithm/11  贪心 这种思想，没有模板，如何才能掌握它.md",
          },
          {
            text: "12  回溯 我把回溯总结成一个公式，回溯题一出就用它",
            link: "/docs/iwalgorithm/12  回溯 我把回溯总结成一个公式，回溯题一出就用它.md",
          },
          {
            text: "13  搜索 如何掌握 DFS 与 BFS 的解题套路",
            link: "/docs/iwalgorithm/13  搜索 如何掌握 DFS 与 BFS 的解题套路.md",
          },
          {
            text: "14  DP  我是怎么治好DP头痛症的",
            link: "/docs/iwalgorithm/14  DP  我是怎么治好DP头痛症的.md",
          },
          {
            text: "15  字符串查找 为什么我最终选择了 BM 算法",
            link: "/docs/iwalgorithm/15  字符串查找 为什么我最终选择了 BM 算法.md",
          },
          {
            text: "16  如何利用 DP 与单调队列寻找最大矩形",
            link: "/docs/iwalgorithm/16  如何利用 DP 与单调队列寻找最大矩形.md",
          },
          {
            text: "17  深度思考子集 如何掌握 5 种通用解法",
            link: "/docs/iwalgorithm/17  深度思考子集 如何掌握 5 种通用解法.md",
          },
          {
            text: "18  单词接龙 如何巧用深搜与广搜的变形",
            link: "/docs/iwalgorithm/18  单词接龙 如何巧用深搜与广搜的变形.md",
          },
          {
            text: "19  最小体力消耗路径 如何突破经典题型，掌握解题模板",
            link: "/docs/iwalgorithm/19  最小体力消耗路径 如何突破经典题型，掌握解题模板.md",
          },
          {
            text: "20  5 种解法，如何利用常量空间求解最长有效括号长度",
            link: "/docs/iwalgorithm/20  5 种解法，如何利用常量空间求解最长有效括号长度.md",
          },
          {
            text: "21  安排会议室 如何利用多种方法安排会议室",
            link: "/docs/iwalgorithm/21  安排会议室 如何利用多种方法安排会议室.md",
          },
          {
            text: "22  数据结构模板 如何让解题变成搭积木",
            link: "/docs/iwalgorithm/22  数据结构模板 如何让解题变成搭积木.md",
          },
          {
            text: "23  算法模板如何让高频算法考点秒变默写题",
            link: "/docs/iwalgorithm/23  算法模板如何让高频算法考点秒变默写题.md",
          },
          {
            text: "24  彩蛋  聊聊我的大厂面试经历，谈谈我对算法学习的看法",
            link: "/docs/iwalgorithm/24  彩蛋  聊聊我的大厂面试经历，谈谈我对算法学习的看法.md",
          },
          {
            text: "25  加餐与答疑  第一期 一问一答",
            link: "/docs/iwalgorithm/25  加餐与答疑  第一期 一问一答.md",
          },
          {
            text: "26  结束语  算法的精进之路",
            link: "/docs/iwalgorithm/26  结束语  算法的精进之路.md",
          },
        ],
      },
      {
        text: "javascript",
        collapsed: true,
        items: [
          {
            text: "01 js函数式编程",
            link: "/docs/javascript/01 js函数式编程.md",
          },
          {
            text: "02 js执行流程解析性能优化",
            link: "/docs/javascript/02 js执行流程解析性能优化.md",
          },
          {
            text: "03 基础知识总结",
            link: "/docs/javascript/03 基础知识总结.md",
          },
          {
            text: "04 JS-WEB-API",
            link: "/docs/javascript/04 JS-WEB-API.md",
          },
          {
            text: "05 基础面试题",
            link: "/docs/javascript/05 基础面试题.md",
          },
          {
            text: "06 工程化面试题汇总",
            link: "/docs/javascript/06 工程化面试题汇总.md",
          },
          {
            text: "07 HTML 面试题汇总",
            link: "/docs/javascript/07 HTML 面试题汇总.md",
          },
          {
            text: "08 网络面试题汇总",
            link: "/docs/javascript/08 网络面试题汇总.md",
          },
          {
            text: "09 Promise面试题归总",
            link: "/docs/javascript/09 Promise面试题归总.md",
          },
          {
            text: "10 javascript 面试题汇总",
            link: "/docs/javascript/10 javascript 面试题汇总.md",
          },
          {
            text: "11 浏览器面试题汇总",
            link: "/docs/javascript/11 浏览器面试题汇总.md",
          },
          {
            text: "12 数据结构与算法总结",
            link: "/docs/javascript/12 数据结构与算法总结.md",
          },
        ],
      },
      {
        text: "jsDataAlgorithms",
        collapsed: true,
        items: [
          {
            text: "01.前言",
            link: "/docs/jsDataAlgorithms/01.前言.md",
          },
          {
            text: "02.数组",
            link: "/docs/jsDataAlgorithms/02.数组.md",
          },
          {
            text: "03.栈",
            link: "/docs/jsDataAlgorithms/03.栈.md",
          },
          {
            text: "04.队列",
            link: "/docs/jsDataAlgorithms/04.队列.md",
          },
          {
            text: "05.优先队列",
            link: "/docs/jsDataAlgorithms/05.优先队列.md",
          },
          {
            text: "06.单向链表",
            link: "/docs/jsDataAlgorithms/06.单向链表.md",
          },
          {
            text: "07.双向链表",
            link: "/docs/jsDataAlgorithms/07.双向链表.md",
          },
          {
            text: "09.集合",
            link: "/docs/jsDataAlgorithms/09.集合.md",
          },
          {
            text: "10.字典",
            link: "/docs/jsDataAlgorithms/10.字典.md",
          },
          {
            text: "11.哈希表",
            link: "/docs/jsDataAlgorithms/11.哈希表.md",
          },
          {
            text: "12.递归",
            link: "/docs/jsDataAlgorithms/12.递归.md",
          },
          {
            text: "13.树",
            link: "/docs/jsDataAlgorithms/13.树.md",
          },
          {
            text: "14.二叉树",
            link: "/docs/jsDataAlgorithms/14.二叉树.md",
          },
          {
            text: "15.二叉搜索树",
            link: "/docs/jsDataAlgorithms/15.二叉搜索树.md",
          },
          {
            text: "16.自平衡树",
            link: "/docs/jsDataAlgorithms/16.自平衡树.md",
          },
          {
            text: "17.二叉堆",
            link: "/docs/jsDataAlgorithms/17.二叉堆.md",
          },
          {
            text: "18.图",
            link: "/docs/jsDataAlgorithms/18.图.md",
          },
          {
            text: "19排序算法",
            link: "/docs/jsDataAlgorithms/19排序算法.md",
          },
          {
            text: "20搜索算法",
            link: "/docs/jsDataAlgorithms/20搜索算法.md",
          },
          {
            text: "21随机算法",
            link: "/docs/jsDataAlgorithms/21随机算法.md",
          },
          {
            text: "22分而治之",
            link: "/docs/jsDataAlgorithms/22分而治之.md",
          },
          {
            text: "23动态规划",
            link: "/docs/jsDataAlgorithms/23动态规划.md",
          },
          {
            text: "24贪心算法",
            link: "/docs/jsDataAlgorithms/24贪心算法.md",
          },
          {
            text: "25回溯算法",
            link: "/docs/jsDataAlgorithms/25回溯算法.md",
          },
          {
            text: "26算法复杂度",
            link: "/docs/jsDataAlgorithms/26算法复杂度.md",
          },
        ],
      },
      {
        text: "linux",
        collapsed: true,
        items: LinuxRte
      },
      {
        text: "mysql基础",
        collapsed: true,
        items: [
          {
            text: "第00章 写在前面",
            link: "/docs/mysql/base/第00章 写在前面.md",
          },
          {
            text: "第01章 数据库概述",
            link: "/docs/mysql/base/第01章 数据库概述.md",
          },
          {
            text: "第02章 MySQL环境搭建",
            link: "/docs/mysql/base/第02章 MySQL环境搭建.md",
          },
          {
            text: "第03章 基本的SELECT语句",
            link: "/docs/mysql/base/第03章 基本的SELECT语句.md",
          },
          {
            text: "第04章 运算符",
            link: "/docs/mysql/base/第04章 运算符.md",
          },
          {
            text: "第05章 排序与分页",
            link: "/docs/mysql/base/第05章 排序与分页.md",
          },
          {
            text: "第06章 多表查询",
            link: "/docs/mysql/base/第06章 多表查询.md",
          },
          {
            text: "第07章 单行函数",
            link: "/docs/mysql/base/第07章 单行函数.md",
          },
          {
            text: "第08章 聚合函数",
            link: "/docs/mysql/base/第08章 聚合函数.md",
          },
          {
            text: "第09章 子查询",
            link: "/docs/mysql/base/第09章 子查询.md",
          },
          {
            text: "第10章 创建和管理表",
            link: "/docs/mysql/base/第10章 创建和管理表.md",
          },
          {
            text: "第11章 数据处理之增删改",
            link: "/docs/mysql/base/第11章 数据处理之增删改.md",
          },
          {
            text: "第12章 MySQL数据类型精讲",
            link: "/docs/mysql/base/第12章 MySQL数据类型精讲.md",
          },
          {
            text: "第13章 约束",
            link: "/docs/mysql/base/第13章 约束.md",
          },
          {
            text: "第14章 视图",
            link: "/docs/mysql/base/第14章 视图.md",
          },
          {
            text: "第15章 存储过程与函数",
            link: "/docs/mysql/base/第15章 存储过程与函数.md",
          },
          {
            text: "第16章 变量、流程控制与游标",
            link: "/docs/mysql/base/第16章 变量、流程控制与游标.md",
          },
          {
            text: "第17章 触发器",
            link: "/docs/mysql/base/第17章 触发器.md",
          },
          {
            text: "第18章 MySQL8其它新特性",
            link: "/docs/mysql/base/第18章 MySQL8其它新特性.md",
          },
          {
            text: "第19章 写在最后",
            link: "/docs/mysql/base/第19章 写在最后.md",
          },
        ],
      },
      {
        text: "mysql进阶",
        collapsed: true,
        items: [
          {
            text: "第01章 Linux下MySQL的安装与使用",
            link: "/docs/mysql/pro/第01章 Linux下MySQL的安装与使用.md",
          },
          {
            text: "第02章 MySQL的数据目录",
            link: "/docs/mysql/pro/第02章 MySQL的数据目录.md",
          },
          {
            text: "第03章 用户与权限管理",
            link: "/docs/mysql/pro/第03章 用户与权限管理.md",
          },
          {
            text: "第04章 逻辑架构",
            link: "/docs/mysql/pro/第04章 逻辑架构.md",
          },
          {
            text: "第05章 存储引擎",
            link: "/docs/mysql/pro/第05章 存储引擎.md",
          },
          {
            text: "第06章 索引的数据结构",
            link: "/docs/mysql/pro/第06章 索引的数据结构.md",
          },
          {
            text: "第07章 InnoDB数据存储结构",
            link: "/docs/mysql/pro/第07章 InnoDB数据存储结构.md",
          },
          {
            text: "第08章 索引的创建与设计原则",
            link: "/docs/mysql/pro/第08章 索引的创建与设计原则.md",
          },
          {
            text: "第09章 性能分析工具的使用",
            link: "/docs/mysql/pro/第09章 性能分析工具的使用.md",
          },
          {
            text: "第10章 索引优化与查询优化",
            link: "/docs/mysql/pro/第10章 索引优化与查询优化.md",
          },
          {
            text: "第11章 数据库的设计规范",
            link: "/docs/mysql/pro/第11章 数据库的设计规范.md",
          },
          {
            text: "第12章 数据库其它调优策略",
            link: "/docs/mysql/pro/第12章 数据库其它调优策略.md",
          },
          {
            text: "第13章 事务基础知识",
            link: "/docs/mysql/pro/第13章 事务基础知识.md",
          },
          {
            text: "第14章 MySQL事务日志",
            link: "/docs/mysql/pro/第14章 MySQL事务日志.md",
          },
          {
            text: "第15章 锁",
            link: "/docs/mysql/pro/第15章 锁.md",
          },
          {
            text: "第16章 多版本并发控制",
            link: "/docs/mysql/pro/第16章 多版本并发控制.md",
          },
          {
            text: "第17章 其他数据库日志",
            link: "/docs/mysql/pro/第17章 其他数据库日志.md",
          },
          {
            text: "第18章 主从复制",
            link: "/docs/mysql/pro/第18章 主从复制.md",
          },
          {
            text: "第19章 数据库备份与恢复",
            link: "/docs/mysql/pro/第19章 数据库备份与恢复.md",
          },
        ],
      },
      {
        text: "network29",
        collapsed: true,
        items: [
          {
            text: "01 漫游互联网：什么是蜂窝移动网络",
            link: "/docs/network29/01 漫游互联网：什么是蜂窝移动网络.md",
          },
          {
            text: "02 传输层协议 TCP：TCP 为什么握手是 3 次、挥手是 4 次",
            link: "/docs/network29/02 传输层协议 TCP：TCP 为什么握手是 3 次、挥手是 4 次.md",
          },
          {
            text: "03 TCP 的封包格式：TCP 为什么要粘包和拆包",
            link: "/docs/network29/03 TCP 的封包格式：TCP 为什么要粘包和拆包.md",
          },
          {
            text: "04 TCP 的稳定性：滑动窗口和流速控制是怎么回事",
            link: "/docs/network29/04 TCP 的稳定性：滑动窗口和流速控制是怎么回事.md",
          },
          {
            text: "05 UDP 协议：TCP 协议和 UDP 协议的优势和劣势",
            link: "/docs/network29/05 UDP 协议：TCP 协议和 UDP 协议的优势和劣势.md",
          },
          {
            text: "06 模块一思考题解答",
            link: "/docs/network29/06 模块一思考题解答.md",
          },
          {
            text: "07 IPv4 协议：路由和寻址的区别是什么",
            link: "/docs/network29/07 IPv4 协议：路由和寻址的区别是什么.md",
          },
          {
            text: "08 IPv6 协议：Tunnel 技术是什么",
            link: "/docs/network29/08 IPv6 协议：Tunnel 技术是什么.md",
          },
          {
            text: "09 NAT 是如何工作的",
            link: "/docs/network29/09 NAT 是如何工作的.md",
          },
          {
            text: "10 TCP 实战：如何进行 TCP 抓包调试",
            link: "/docs/network29/10 TCP 实战：如何进行 TCP 抓包调试.md",
          },
          {
            text: "11 模块二思考题解答",
            link: "/docs/network29/11 模块二思考题解答.md",
          },
          {
            text: "12 Socket 编程：epoll 为什么用红黑树",
            link: "/docs/network29/12 Socket 编程：epoll 为什么用红黑树.md",
          },
          {
            text: "13 流和缓冲区：缓冲区的 flip 是怎么回事",
            link: "/docs/network29/13 流和缓冲区：缓冲区的 flip 是怎么回事.md",
          },
          {
            text: "14 网络 IO 模型：BIO、NIO 和 AIO 有什么区别",
            link: "/docs/network29/14 网络 IO 模型：BIO、NIO 和 AIO 有什么区别.md",
          },
          {
            text: "15 面试中如何回答“怎样实现 RPC 框架”的问题",
            link: "/docs/network29/15 面试中如何回答“怎样实现 RPC 框架”的问题.md",
          },
          {
            text: "16 模块三思考题解答",
            link: "/docs/network29/16 模块三思考题解答.md",
          },
          {
            text: "17 DNS 域名解析系统：CNAME 记录的作用是什么",
            link: "/docs/network29/17 DNS 域名解析系统：CNAME 记录的作用是什么.md",
          },
          {
            text: "18 内容分发网络：请简述 CDN 回源如何工作",
            link: "/docs/network29/18 内容分发网络：请简述 CDN 回源如何工作.md",
          },
          {
            text: "19 HTTP 协议面试通关：强制缓存和协商缓存的区别是什么",
            link: "/docs/network29/19 HTTP 协议面试通关：强制缓存和协商缓存的区别是什么.md",
          },
          {
            text: "20 流媒体技术：直播网站是如何实现的",
            link: "/docs/network29/20 流媒体技术：直播网站是如何实现的.md",
          },
          {
            text: "21 爬虫和反爬虫：如何防止黑产爬取我的数据",
            link: "/docs/network29/21 爬虫和反爬虫：如何防止黑产爬取我的数据.md",
          },
          {
            text: "22 模块四思考题解答",
            link: "/docs/network29/22 模块四思考题解答.md",
          },
          {
            text: "23 网络安全概述：对称、非对称加密的区别是什么",
            link: "/docs/network29/23 网络安全概述：对称、非对称加密的区别是什么.md",
          },
          {
            text: "24 信任链：为什么可以相信一个 HTTPS 网站",
            link: "/docs/network29/24 信任链：为什么可以相信一个 HTTPS 网站.md",
          },
          {
            text: "25 攻防手段介绍：如何抵御 SYN 拒绝攻击",
            link: "/docs/network29/25 攻防手段介绍：如何抵御 SYN 拒绝攻击.md",
          },
          {
            text: "26 模块五思考题解答",
            link: "/docs/network29/26 模块五思考题解答.md",
          },
        ],
      },
      {
        text: "node",
        collapsed: true,
        items: [
          {
            text: "01 基础理论",
            link: "/docs/node/01 基础理论.md",
          },
          {
            text: "02 全局变量 process 和 核心模块 path",
            link: "/docs/node/02 全局变量 process 和 核心模块 path.md",
          },
          {
            text: "03 全局变量 Buffer",
            link: "/docs/node/03 全局变量 Buffer.md",
          },
          {
            text: "04 核心模块 fs 之模块介绍、文件一次性操作",
            link: "/docs/node/04 核心模块 fs 之模块介绍、文件一次性操作.md",
          },
          {
            text: "05 核心模块 fs 之大文件读写、目录API及模拟实现",
            link: "/docs/node/05 核心模块 fs 之大文件读写、目录API及模拟实现.md",
          },
          {
            text: "06 模块化 模块化历程、CommonJS、模块加载流程",
            link: "/docs/node/06 模块化 模块化历程、CommonJS、模块加载流程.md",
          },
          {
            text: "07 模块化 模块加载源码解析",
            link: "/docs/node/07 模块化 模块加载源码解析.md",
          },
          {
            text: "08 模块化 VM模块、模块加载模拟实现",
            link: "/docs/node/08 模块化 VM模块、模块加载模拟实现.md",
          },
          {
            text: "09 核心模块 events和源码模拟实现EventEmitter类",
            link: "/docs/node/09 核心模块 events和源码模拟实现EventEmitter类.md",
          },
          {
            text: "10 核心模块  Nodejs和浏览器中的 Event Loop",
            link: "/docs/node/10 核心模块  Nodejs和浏览器中的 Event Loop.md",
          },
          {
            text: "11 核心模块 Stream 流、Nodejs 中流的类型",
            link: "/docs/node/11 核心模块 Stream 流、Nodejs 中流的类型.md",
          },
          {
            text: "12 核心模块 Stream流、write 执行流程及源码分析",
            link: "/docs/node/12 核心模块 Stream流、write 执行流程及源码分析.md",
          },
          {
            text: "13 核心模块 Stream流、模拟pipe 背压机制、文件可读流",
            link: "/docs/node/13 核心模块 Stream流、模拟pipe 背压机制、文件可读流.md",
          },
          {
            text: "14 核心模块 Stream流、链表结构、模拟单向链表、文件可写流、pipe",
            link: "/docs/node/14 核心模块 Stream流、链表结构、模拟单向链表、文件可写流、pipe.md",
          },
          {
            text: "15 核心模块 Stream流、 模拟文件汇总",
            link: "/docs/node/15 核心模块 Stream流、 模拟文件汇总.md",
          },
          {
            text: "16 通信 网络通信基本原理",
            link: "/docs/node/16 通信 网络通信基本原理.md",
          },
          {
            text: "17 通信 创建TCP通信、数据粘包、封包、拆包",
            link: "/docs/node/17 通信 创建TCP通信、数据粘包、封包、拆包.md",
          },
          {
            text: "18 通信 HTTP模块、客户端代理、静态服务实现",
            link: "/docs/node/18 通信 HTTP模块、客户端代理、静态服务实现.md",
          },
        ],
      },
      {
        text: "node2",
        collapsed: true,
        items: [
          {
            text: "00 开篇词  Node.js 从工程化工具到后端服务应用的转变",
            link: "/docs/node2/00 开篇词  Node.js 从工程化工具到后端服务应用的转变.md",
          },
          {
            text: "00 课前导读  Node.j 在前端工程化和后端服务应用的区别",
            link: "/docs/node2/00 课前导读  Node.j 在前端工程化和后端服务应用的区别.md",
          },
          {
            text: "01  事件循环：高性能到底是如何做到的？",
            link: "/docs/node2/01  事件循环：高性能到底是如何做到的？.md",
          },
          {
            text: "02  应用场景：Node.j 作为后台可以提供哪些服务？",
            link: "/docs/node2/02  应用场景：Node.j 作为后台可以提供哪些服务？.md",
          },
          {
            text: "03  如何构建一个简单的 RESTful 服务？",
            link: "/docs/node2/03  如何构建一个简单的 RESTful 服务？.md",
          },
          {
            text: "04  3 大主流系统框架：由浅入深分析 Expre、Koa 和 Egg.j",
            link: "/docs/node2/04  3 大主流系统框架：由浅入深分析 Expre、Koa 和 Egg.j.md",
          },
          {
            text: "05  多进程解决方案：cluter 模式以及 PM2 工具的原理介绍",
            link: "/docs/node2/05  多进程解决方案：cluter 模式以及 PM2 工具的原理介绍.md",
          },
          {
            text: "06  哪些因素会影响 Node.j 性能？",
            link: "/docs/node2/06  哪些因素会影响 Node.j 性能？.md",
          },
          {
            text: "07  CPU 过载保护设计：如何在服务层面确保系统稳定？",
            link: "/docs/node2/07  CPU 过载保护设计：如何在服务层面确保系统稳定？.md",
          },
          {
            text: "08  优化设计：在 IO 方面应该注意哪些要点？",
            link: "/docs/node2/08  优化设计：在 IO 方面应该注意哪些要点？.md",
          },
          {
            text: "09  缓存与应用：多级缓存策略介绍与应用要点",
            link: "/docs/node2/09  缓存与应用：多级缓存策略介绍与应用要点.md",
          },
          {
            text: "10  系统稳定：如何监控和保护进程安全？",
            link: "/docs/node2/10  系统稳定：如何监控和保护进程安全？.md",
          },
          {
            text: "11  内存检查：多种类型的内存泄漏分析方案",
            link: "/docs/node2/11  内存检查：多种类型的内存泄漏分析方案.md",
          },
          {
            text: "12  性能分析：性能影响的关键路径以及优化策略",
            link: "/docs/node2/12  性能分析：性能影响的关键路径以及优化策略.md",
          },
          {
            text: "13  网络安全：常见网络攻击以及防护策略",
            link: "/docs/node2/13  网络安全：常见网络攻击以及防护策略.md",
          },
          {
            text: "14  工具应用：使用 clinicj 工具实现通用性安全检查",
            link: "/docs/node2/14  工具应用：使用 clinicj 工具实现通用性安全检查.md",
          },
          {
            text: "15  理论先行：高并发设计必须学的知识点有哪些？",
            link: "/docs/node2/15  理论先行：高并发设计必须学的知识点有哪些？.md",
          },
          {
            text: "16  RESTful 应用实践：构建一个介于前后台之间的服务",
            link: "/docs/node2/16  RESTful 应用实践：构建一个介于前后台之间的服务.md",
          },
          {
            text: "17  系统的实践设计（上）：完成一个通用抢票系统",
            link: "/docs/node2/17  系统的实践设计（上）：完成一个通用抢票系统.md",
          },
          {
            text: "18  系统的实践设计（下）：完成一个通用投票系统",
            link: "/docs/node2/18  系统的实践设计（下）：完成一个通用投票系统.md",
          },
          {
            text: "19  Serverle 的实践：进一步提升系统的稳定性",
            link: "/docs/node2/19  Serverle 的实践：进一步提升系统的稳定性.md",
          },
          {
            text: "20 结束语  如何规划自己的 Node.j 学习之路？",
            link: "/docs/node2/20 结束语  如何规划自己的 Node.j 学习之路？.md",
          },
        ],
      },
      {
        text: "nodeAPI",
        collapsed: true,
        items: [
          {
            text: "01 Assert、Async hooks",
            link: "/docs/nodeAPI/01 Assert、Async hooks.md",
          },
          {
            text: "02 Buffer",
            link: "/docs/nodeAPI/02 Buffer.md",
          },
          {
            text: "03 C++、Node-API",
            link: "/docs/nodeAPI/03 C++、Node-API.md",
          },
          {
            text: "04 C++ embedder、Child process",
            link: "/docs/nodeAPI/04 C++ embedder、Child process.md",
          },
          {
            text: "05 Cluster、Console、Corepack",
            link: "/docs/nodeAPI/05 Cluster、Console、Corepack.md",
          },
          {
            text: "06 Command-line API",
            link: "/docs/nodeAPI/06 Command-line API.md",
          },
          {
            text: "07 Crypto",
            link: "/docs/nodeAPI/07 Crypto.md",
          },
          {
            text: "08 Debugger、Deprecated、Diagnostics",
            link: "/docs/nodeAPI/08 Debugger、Deprecated、Diagnostics.md",
          },
          {
            text: "09 DNS、Domain",
            link: "/docs/nodeAPI/09 DNS、Domain.md",
          },
          {
            text: "10 Events",
            link: "/docs/nodeAPI/10 Events.md",
          },
          {
            text: "11 Errors 01",
            link: "/docs/nodeAPI/11 Errors 01.md",
          },
          {
            text: "12 Errors 02",
            link: "/docs/nodeAPI/12 Errors 02.md",
          },
          {
            text: "13 File system",
            link: "/docs/nodeAPI/13 File system.md",
          },
          {
            text: "14 Global",
            link: "/docs/nodeAPI/14 Global.md",
          },
          {
            text: "15 HTTP",
            link: "/docs/nodeAPI/15 HTTP.md",
          },
          {
            text: "16 HTTP 2、HTTPS",
            link: "/docs/nodeAPI/16 HTTP 2、HTTPS.md",
          },
          {
            text: "17 Inspector、Net",
            link: "/docs/nodeAPI/17 Inspector、Net.md",
          },
          {
            text: "18 Modules",
            link: "/docs/nodeAPI/18 Modules.md",
          },
          {
            text: "19 OS、Path",
            link: "/docs/nodeAPI/19 OS、Path.md",
          },
          {
            text: "20 Performance、Permissions",
            link: "/docs/nodeAPI/20 Performance、Permissions.md",
          },
          {
            text: "21 Process、Punycode、Query",
            link: "/docs/nodeAPI/21 Process、Punycode、Query.md",
          },
          {
            text: "22 Readline、Stream、String",
            link: "/docs/nodeAPI/22 Readline、Stream、String.md",
          },
          {
            text: "23 Test runner",
            link: "/docs/nodeAPI/23 Test runner.md",
          },
          {
            text: "24 Timers、TLS、TTY",
            link: "/docs/nodeAPI/24 Timers、TLS、TTY.md",
          },
          {
            text: "25 Trace events、YYT",
            link: "/docs/nodeAPI/25 Trace events、YYT.md",
          },
          {
            text: "26 UDP、URL",
            link: "/docs/nodeAPI/26 UDP、URL.md",
          },
          {
            text: "27 Util",
            link: "/docs/nodeAPI/27 Util.md",
          },
          {
            text: "28 V8",
            link: "/docs/nodeAPI/28 V8.md",
          },
          {
            text: "29 VM",
            link: "/docs/nodeAPI/29 VM.md",
          },
          {
            text: "30 WebAssembly 、Web Crypto、Web Streams",
            link: "/docs/nodeAPI/30 WebAssembly 、Web Crypto、Web Streams.md",
          },
          {
            text: "31 Worker threads",
            link: "/docs/nodeAPI/31 Worker threads.md",
          },
          {
            text: "32 Zlib",
            link: "/docs/nodeAPI/32 Zlib.md",
          },
        ],
      },
      {
        text: "redis",
        collapsed: true,
        items: [
          {
            text: "01 简介、安装、配置",
            link: "/docs/redis/01 简介、安装、配置.md",
          },
          {
            text: "02 常用数据类型及操作命令、过期时间",
            link: "/docs/redis/02 常用数据类型及操作命令、过期时间.md",
          },
          {
            text: "03 事务",
            link: "/docs/redis/03 事务.md",
          },
          {
            text: "04 持久化",
            link: "/docs/redis/04 持久化.md",
          },
          {
            text: "05 Node.js 客户端操作 Redis、Pipeline 流水线",
            link: "/docs/redis/05 Node.js 客户端操作 Redis、Pipeline 流水线.md",
          },
          {
            text: "06 漂流瓶案例",
            link: "/docs/redis/06 漂流瓶案例.md",
          },
        ],
      },
      {
        text: "relgorithm",
        collapsed: true,
        items: [
          {
            text: "01  复杂度：如何衡量程序运行的效率？",
            link: "/docs/relgorithm/01  复杂度：如何衡量程序运行的效率？.md",
          },
          {
            text: "02  数据结构：将“昂贵”的时间复杂度转换成“廉价”的空间复杂度",
            link: "/docs/relgorithm/02  数据结构：将“昂贵”的时间复杂度转换成“廉价”的空间复杂度.md",
          },
          {
            text: "03  增删查：掌握数据处理的基本操作,以不变应万变",
            link: "/docs/relgorithm/03  增删查：掌握数据处理的基本操作,以不变应万变.md",
          },
          {
            text: "04  如何完成线性表结构下的增删查？",
            link: "/docs/relgorithm/04  如何完成线性表结构下的增删查？.md",
          },
          {
            text: "05  栈：后进先出的线性表，如何实现增删查？",
            link: "/docs/relgorithm/05  栈：后进先出的线性表，如何实现增删查？.md",
          },
          {
            text: "06  队列：先进先出的线性表，如何实现增删查？",
            link: "/docs/relgorithm/06  队列：先进先出的线性表，如何实现增删查？.md",
          },
          {
            text: "07  数组：如何实现基于索引的查找？",
            link: "/docs/relgorithm/07  数组：如何实现基于索引的查找？.md",
          },
          {
            text: "08  字符串：如何正确回答面试中高频考察的字符串匹配算法？",
            link: "/docs/relgorithm/08  字符串：如何正确回答面试中高频考察的字符串匹配算法？.md",
          },
          {
            text: "09  树和二叉树：分支关系与层次结构下，如何有效实现增删查？",
            link: "/docs/relgorithm/09  树和二叉树：分支关系与层次结构下，如何有效实现增删查？.md",
          },
          {
            text: "10  哈希表：如何利用好高效率查找的“利器”？",
            link: "/docs/relgorithm/10  哈希表：如何利用好高效率查找的“利器”？.md",
          },
          {
            text: "11  递归：如何利用递归求解汉诺塔问题？",
            link: "/docs/relgorithm/11  递归：如何利用递归求解汉诺塔问题？.md",
          },
          {
            text: "12  分治：如何利用分治法完成数据查找？",
            link: "/docs/relgorithm/12  分治：如何利用分治法完成数据查找？.md",
          },
          {
            text: "13  排序：经典排序算法原理解析与优劣对比",
            link: "/docs/relgorithm/13  排序：经典排序算法原理解析与优劣对比.md",
          },
          {
            text: "14  动态规划：如何通过最优子结构，完成复杂问题求解？",
            link: "/docs/relgorithm/14  动态规划：如何通过最优子结构，完成复杂问题求解？.md",
          },
          {
            text: "15  定位问题才能更好地解决问题：开发前的复杂度分析与技术选型",
            link: "/docs/relgorithm/15  定位问题才能更好地解决问题：开发前的复杂度分析与技术选型.md",
          },
          {
            text: "16  真题案例（一）：算法思维训练",
            link: "/docs/relgorithm/16  真题案例（一）：算法思维训练.md",
          },
          {
            text: "17  真题案例（二）：数据结构训练",
            link: "/docs/relgorithm/17  真题案例（二）：数据结构训练.md",
          },
          {
            text: "18  真题案例（三）：力扣真题训练",
            link: "/docs/relgorithm/18  真题案例（三）：力扣真题训练.md",
          },
          {
            text: "19  真题案例（四）：大厂真题实战演练",
            link: "/docs/relgorithm/19  真题案例（四）：大厂真题实战演练.md",
          },
          {
            text: "20  代码之外，技术面试中你应该具备哪些软素质？",
            link: "/docs/relgorithm/20  代码之外，技术面试中你应该具备哪些软素质？.md",
          },
          {
            text: "21  面试中如何建立全局观，快速完成优质的手写代码？",
            link: "/docs/relgorithm/21  面试中如何建立全局观，快速完成优质的手写代码？.md",
          },
          {
            text: "22 加餐  课后练习题详解",
            link: "/docs/relgorithm/22 加餐  课后练习题详解.md",
          },
          {
            text: "23 结束语  勤修内功，构建你的核心竞争力",
            link: "/docs/relgorithm/23 结束语  勤修内功，构建你的核心竞争力.md",
          },
        ],
      },
      {
        text: "springBoot2",
        collapsed: true,
        items: [
          {
            text: "SpringBoot2-base",
            link: "/docs/springBoot2/SpringBoot2-base.md",
          },
          {
            text: "SpringBoot2-core",
            link: "/docs/springBoot2/SpringBoot2-core.md",
          },
        ],
      },
      {
        text: "typescript",
        collapsed: true,
        items: [
          {
            text: "01 搭建和一些基础类型",
            link: "/docs/typescript/01 搭建和一些基础类型.md",
          },
          {
            text: "02 函数、类、接口类型和类型别名",
            link: "/docs/typescript/02 函数、类、接口类型和类型别名.md",
          },
          {
            text: "03 联合类型、交叉类型、枚举类型、泛型",
            link: "/docs/typescript/03 联合类型、交叉类型、枚举类型、泛型.md",
          },
          {
            text: "04 类型守卫、类型兼容、增强类型系统",
            link: "/docs/typescript/04 类型守卫、类型兼容、增强类型系统.md",
          },
          {
            text: "05 官方工具类、打造自己的工具类型",
            link: "/docs/typescript/05 官方工具类、打造自己的工具类型.md",
          },
          {
            text: "06 使用TypeScript开发Node.js应用",
            link: "/docs/typescript/06 使用TypeScript开发Node.js应用.md",
          },
          {
            text: "07 使用TS编进行Vue开发的常见知识点",
            link: "/docs/typescript/07 使用TS编进行Vue开发的常见知识点.md",
          },
        ],
      },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
