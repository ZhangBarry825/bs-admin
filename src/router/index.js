import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

/* Router Modules */
import componentsRouter from './modules/components'
import chartsRouter from './modules/charts'
import tableRouter from './modules/table'
import treeTableRouter from './modules/tree-table'
import nestedRouter from './modules/nested'

/** note: sub-menu only appear when children.length>=1
 *  detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    will control the page roles (you can set multiple roles)
    title: 'title'               the name show in sub-menu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if true, the page will no be cached(default is false)
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
    affix: true                  if true, the tag will affix in the tags-view
  }
 **/
export const constantRouterMap = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/authredirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: {title: 'dashboard', icon: 'dashboard', noCache: true, affix: true}
      }
    ]
  }
  // ,
  // {
  //   path: '/documentation',
  //   component: Layout,
  //   redirect: '/documentation/index',
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/documentation/index'),
  //       name: 'Documentation',
  //       meta: { title: 'documentation', icon: 'documentation', affix: true }
  //     }
  //   ]
  // },
  // {
  //   path: '/guide',
  //   component: Layout,
  //   redirect: '/guide/index',
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/guide/index'),
  //       name: 'Guide',
  //       meta: { title: 'guide', icon: 'guide', noCache: true }
  //     }
  //   ]
  // }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  // {
  //   path: '/permission',
  //   component: Layout,
  //   redirect: '/permission/index',
  //   alwaysShow: true, // will always show the root menu
  //   meta: {
  //     title: 'permission',
  //     icon: 'lock',
  //     roles: ['admin', 'editor'] // you can set roles in root nav
  //   },
  //   children: [
  //     {
  //       path: 'page',
  //       component: () => import('@/views/permission/page'),
  //       name: 'PagePermission',
  //       meta: {
  //         title: 'pagePermission',
  //         roles: ['admin'] // or you can only set roles in sub nav
  //       }
  //     },
  //     {
  //       path: 'directive',
  //       component: () => import('@/views/permission/directive'),
  //       name: 'DirectivePermission',
  //       meta: {
  //         title: 'directivePermission'
  //         // if do not set roles, means: this page does not require permission
  //       }
  //     }
  //   ]
  // },

  // {
  //   path: '/icon',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/svg-icons/index'),
  //       name: 'Icons',
  //       meta: { title: 'icons', icon: 'icon', noCache: true }
  //     }
  //   ]
  // },

  /** When your routing table is too long, you can split it into small modules**/
  // componentsRouter,
  // chartsRouter,
  // nestedRouter,
  // tableRouter,
  // treeTableRouter,

  {
    path: '/example',
    component: Layout,
    redirect: '/example/list',
    name: 'Example',
    hidden: true,
    meta: {
      title: 'example',
      icon: 'example'
    },
    children: [
      {
        path: 'create',
        component: () => import('@/views/example/create'),
        name: 'CreateArticle',
        meta: {title: 'createArticle', icon: 'edit'}
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import('@/views/example/edit'),
        name: 'EditArticle',
        meta: {title: 'editArticle', noCache: true},
        hidden: true
      },
      {
        path: 'list',
        component: () => import('@/views/example/list'),
        name: 'ArticleList',
        meta: {title: 'articleList', icon: 'list'}
      }
    ]
  },

  // {
  //   path: '/tab',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/tab/index'),
  //       name: 'Tab',
  //       meta: { title: 'tab', icon: 'tab' }
  //     }
  //   ]
  // },

  {
    path: '/error',
    component: Layout,
    redirect: 'noredirect',
    name: 'ErrorPages',
    hidden: true,
    meta: {
      title: 'errorPages',
      icon: '404'
    },
    children: [
      {
        path: '401',
        component: () => import('@/views/errorPage/401'),
        name: 'Page401',
        meta: {title: 'page401', noCache: true}
      },
      {
        path: '404',
        component: () => import('@/views/errorPage/404'),
        name: 'Page404',
        meta: {title: 'page404', noCache: true}
      }
    ]
  },

  // {
  //   path: '/error-log',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   children: [
  //     {
  //       path: 'log',
  //       component: () => import('@/views/errorLog/index'),
  //       name: 'ErrorLog',
  //       meta: { title: 'errorLog', icon: 'bug' }
  //     }
  //   ]
  // },

  // {
  //   path: '/excel',
  //   component: Layout,
  //   redirect: '/excel/export-excel',
  //   name: 'Excel',
  //   meta: {
  //     title: 'excel',
  //     icon: 'excel'
  //   },
  //   children: [
  //     {
  //       path: 'export-excel',
  //       component: () => import('@/views/excel/exportExcel'),
  //       name: 'ExportExcel',
  //       meta: { title: 'exportExcel' }
  //     },
  //     {
  //       path: 'export-selected-excel',
  //       component: () => import('@/views/excel/selectExcel'),
  //       name: 'SelectExcel',
  //       meta: { title: 'selectExcel' }
  //     },
  //     {
  //       path: 'upload-excel',
  //       component: () => import('@/views/excel/uploadExcel'),
  //       name: 'UploadExcel',
  //       meta: { title: 'uploadExcel' }
  //     }
  //   ]
  // },

  // {
  //   path: '/zip',
  //   component: Layout,
  //   redirect: '/zip/download',
  //   alwaysShow: true,
  //   meta: { title: 'zip', icon: 'zip' },
  //   children: [
  //     {
  //       path: 'download',
  //       component: () => import('@/views/zip/index'),
  //       name: 'ExportZip',
  //       meta: { title: 'exportZip' }
  //     }
  //   ]
  // },

  // {
  //   path: '/pdf',
  //   component: Layout,
  //   redirect: '/pdf/index',
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/pdf/index'),
  //       name: 'PDF',
  //       meta: { title: 'pdf', icon: 'pdf' }
  //     }
  //   ]
  // },
  // {
  //   path: '/pdf/download',
  //   component: () => import('@/views/pdf/download'),
  //   hidden: true
  // },

  // {
  //   path: '/theme',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/theme/index'),
  //       name: 'Theme',
  //       meta: { title: 'theme', icon: 'theme' }
  //     }
  //   ]
  // },

  // {
  //   path: '/clipboard',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/clipboard/index'),
  //       name: 'ClipboardDemo',
  //       meta: { title: 'clipboardDemo', icon: 'clipboard' }
  //     }
  //   ]
  // },

  // {
  //   path: '/i18n',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/i18n-demo/index'),
  //       name: 'I18n',
  //       meta: { title: 'i18n', icon: 'international' }
  //     }
  //   ]
  // },

  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://github.com/PanJiaChen/vue-element-admin',
  //       meta: { title: 'externalLink', icon: 'link' }
  //     }
  //   ]
  // },

  {
    path: '/commodity',
    component: Layout,
    redirect: 'noredirect',
    name: 'Commodity',
    meta: {
      title: '商品管理',
      icon: 'sp'
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/commodity/list'),
        name: '商品列表',
        meta: {title: '商品列表', noCache: true, icon: 'sp'}
      },
      {
        path: 'edit/:id',
        component: () => import('@/views/commodity/edit'),
        name: '商品编辑',
        // hidden:true,
        meta: {title: '商品编辑', noCache: true, icon: 'sp'},
        hidden: true
      },
      {
        path: 'type',
        component: () => import('@/views/commodity/type'),
        name: '商品分类',
        meta: {title: '商品分类', noCache: true, icon: 'sp'}
      },
      // {
      //   path: 'specification',
      //   component: () => import('@/views/commodity/specification'),
      //   name: '商品规格',
      //   meta: { title: '商品规格', noCache: true, icon: 'clipboard' }
      // },
      {
        path: 'push',
        component: () => import('@/views/commodity/push'),
        name: '发布商品',
        meta: {title: '发布商品', noCache: true, icon: 'sp'}
      },
      {
        path: 'addType',
        component: () => import('@/views/commodity/addType'),
        name: '新建分类',
        meta: {title: '新建分类', noCache: true, icon: 'sp'}
      },
      {
        path: 'editType/:id',
        component: () => import('@/views/commodity/editType'),
        name: '编辑分类',
        // hidden:true,
        meta: {title: '编辑分类', noCache: true, icon: 'sp'},
        hidden: true
      }
    ]
  },
  {
    path: '/order',
    component: Layout,
    redirect: 'noredirect',
    name: 'Order',
    meta: {
      title: '订单管理',
      icon: 'dd'
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/order/list'),
        name: '订单列表',
        meta: {title: '订单列表', noCache: true, icon: 'dd'}
      },
      {
        path: 'refund',
        component: () => import('@/views/order/refund'),
        name: '退货订单',
        meta: {title: '退货订单', noCache: true, icon: 'dd'}
      },
      {
        path: 'detail/:id',
        component: () => import('@/views/order/detail'),
        name: '订单详情',
        meta: {title: '订单详情', noCache: true, icon: 'dd'},
        hidden: true
      },
      {
        path: 'refundDetail/:id',
        component: () => import('@/views/order/refundDetail'),
        name: '退货详情',
        meta: {title: '退货详情', noCache: true, icon: 'dd'},
        hidden: true
      }
    ]
  },
  {
    path: '/sale',
    component: Layout,
    redirect: 'noredirect',
    name: '分销管理',
    meta: {
      title: '分销管理',
      icon: 'fx'
    },
    children: [

      {
        path: 'encash',
        component: () => import('@/views/sale/encash'),
        name: '提现管理',
        meta: {title: '提现管理', noCache: true, icon: 'fx'}
      },
      {
        path: 'saleRule',
        component: () => import('@/views/sale/saleRule'),
        name: '分销规则',
        meta: {title: '分销规则', noCache: true, icon: 'fx'}
      },
      {
        path: 'saleUser',
        component: () => import('@/views/sale/saleUser'),
        name: '分销用户',
        meta: {title: '分销用户', noCache: true, icon: 'fx'}
      },
      {
        path: 'detailUser/:id',
        component: () => import('@/views/sale/detailUser'),
        name: '用户详情',
        meta: {title: '用户详情', noCache: true, icon: 'fx'},
        hidden: true
      },
      {
        path: 'commissionRule',
        component: () => import('@/views/sale/commissionRule'),
        name: '佣金规则',
        meta: {title: '佣金规则', noCache: true, icon: 'fx'}
      }
    ]
  },
  {
    path: '/set',
    component: Layout,
    redirect: 'noredirect',
    name: '平台管理',
    meta: {
      title: '平台管理',
      icon: 'xt'
    },
    children: [
      {
        path: 'membership',
        component: () => import('@/views/set/membership'),
        name: '会员管理',
        meta: {title: '会员管理', noCache: true, icon: 'xt'}
      },
      {
        path: 'message',
        component: () => import('@/views/set/message'),
        name: '通知管理',
        meta: {title: '通知管理', noCache: true, icon: 'xt'}
      },
      {
        path: 'sysUser',
        component: () => import('@/views/set/sysUser'),
        name: '系统用户',
        meta: {title: '系统用户', noCache: true, icon: 'xt'}
      },
      {
        path: 'pushMessage',
        component: () => import('@/views/set/pushMessage'),
        name: '发布通知',
        meta: {title: '发布通知', noCache: true, icon: 'xt'}
      },
      {
        path: 'editMessage/:id',
        component: () => import('@/views/set/editMessage'),
        name: '编辑通知',
        meta: {title: '编辑通知', noCache: true, icon: 'xt'},
        hidden: true
      },
      {
        path: 'newUser',
        component: () => import('@/views/set/newUser'),
        name: '新建用户',
        meta: {title: '新建用户', noCache: true, icon: 'xt'}
      },
      {
        path: 'editUser',
        component: () => import('@/views/set/editUser'),
        name: '用户信息',
        meta: {title: '用户信息', noCache: true, icon: 'xt'}
      }
    ]
  },
  {path: '*', redirect: '/404', hidden: true}
]
