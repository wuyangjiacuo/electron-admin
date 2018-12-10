import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'landing-page',
    //   component: require('@/components/LandingPage').default
    // },
    {
      path: '*',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: require('@/pages/login/login').default
    },
    {
      path: '/reg',
      name: 'reg',
      component: require('@/pages/login/reg').default
    },
    {
      path: '/admin',
      name: 'admin',
      component: require('@/pages/admin/index').default,
      children: [
        {
          path: 'article/addArticle',
          name: 'addArticle',
          component: require('@/pages/admin/article/addArticle').default
        },
        {
          path: 'article/articleManager',
          name: 'articleManager',
          component: require('@/pages/admin/article/articleManager').default
        },
        {
          path: 'article/editArticle',
          name: 'editArticle',
          component: require('@/pages/admin/article/editArticle').default
        },
        {
          path: 'article/cateEditor',
          name: 'cateEditor',
          component: require('@/pages/admin/article/cateEditor').default
        },
        {
          path: 'gif/gifManager',
          name: 'gifManager',
          component: require('@/pages/admin/gif/gifManager').default
        },
        {
          path: 'task/addTask',
          name: 'addTask',
          component: require('@/pages/admin/task/addTask').default
        },
        {
          path: 'task/taskmanager',
          name: 'taskmanager',
          component: require('@/pages/admin/task/taskmanager').default
        },
        {
          path: 'user/addUser',
          name: 'addUser',
          component: require('@/pages/admin/user/addUser').default
        },
        {
          path: 'user/userManager',
          name: 'userManager',
          component: require('@/pages/admin/user/userManager').default
        }
      ]
    }
  ]
})
