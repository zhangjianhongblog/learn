import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: '评估表', icon: 'example' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/assessment/fall/index'),
        meta: { title: '跌倒/坠床/意外事件危险因素评估表', icon: 'table' }
      },
    {
      path: 'table1',
        name: 'Table1',
      component: () => import('@/views/assessment/pipeSlip/index'),
      meta: { title: '管道滑脱评估表', icon: 'table' }
    },
    {
      path: 'table2',
        name: 'Table2',
      component: () => import('@/views/assessment/exosmosis/index'),
      meta: { title: '外渗危险因素评估表', icon: 'table' }
    },
    {
      path: 'table3',
        name: 'Table3',
      component: () => import('@/views/assessment/burns/index'),
      meta: { title: '烫伤危险因素评估表', icon: 'table' }
    },
    {
      path: 'table4',
        name: 'Table4',
      component: () => import('@/views/assessment/choking/index'),
      meta: { title: '误吸/窒息危险因素评估表', icon: 'table' }
    },
    {
      path: 'table5',
        name: 'Table5',
      component: () => import('@/views/assessment/ability/index'),
      meta: { title: '自理能力评估表', icon: 'table' }
    },
    {
      path: 'table6',
        name: 'Table6',
      component: () => import('@/views/assessment/pressure/index'),
      meta: { title: '高危人群压疮评估表', icon: 'table' }
    },{
        path: 'table7',
        name: 'Table7',
        component: () => import('@/views/assessment/pain/index'),
        meta: { title: '疼痛评估记录单', icon: 'table' }
      },
    {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    meta: { title: '汇总统计', icon: 'example' },
    children: [
      {
        path: 'index1',
        name: 'Form',
        component: () => import('@/views/statistics/patient/index'),
        meta: { title: '汇总统计人员表', icon: 'form' }
      },
      {
        path: 'index2',
        name: 'Form',
        component: () => import('@/views/statistics/assessmentSheet/index'),
        meta: { title: '汇总统计评估表', icon: 'form' }
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: '报告表',
      icon: 'nested'
    },
    children: [
      {
        path: 'danger',
        component: () => import('@/views/report/danger/index'),
        meta: { title: '高危人群压疮报告表' }
      },
      {
        path: 'NursingSafety',
        component: () => import('@/views/report/NursingSafety/index'),
        meta: { title: '护理安全风险告知书' }
      },
      {
        path: 'BloodTransfusion',
        component: () => import('@/views/report/BloodTransfusion/index'),
        meta: { title: '输血不良反应回报单' }
      },
      {
        path: 'TubeSlippage',
        component: () => import('@/views/report/TubeSlippage/index'),
        meta: { title: '住院患者管路滑脱登记上报表' }
      },
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: { title: 'menu2' }
      }

    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      },
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
