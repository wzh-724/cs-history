import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/Login.vue';
import Home from '../views/Home.vue';
import UserManage from '../components/content/UserManage';
import ArticleManage from '../components/content/ArticleManage';
import MesManage from '../components/content/MesManage';
import WriteArticle from '../components/content/WriteArticle';
const routes = [
  { path: '/', redirect: '/login', },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    // redirect: '/login'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [
      { path: '/home', redirect: '/home/user_manage' },
      {
        path: 'user_manage', name: 'UserManage', component: UserManage
      },
      {
        path: 'article_manage', name: 'ArticleManage', component: ArticleManage
      },
      {
        path: 'mes_manage', name: 'MesManage', component: MesManage
      },
      {
        path: '/home/WriteArticle',
        name: 'WriteArticle',
        component: WriteArticle,
      },


    ]
  },


]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
