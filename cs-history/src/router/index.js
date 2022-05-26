import { createRouter, createWebHashHistory } from 'vue-router'
import Home from 'views/Home.vue'
import LatestNews from 'components/content/LatestNews.vue'
import CharacterDeeds from 'components/content/CharacterDeeds.vue'
import HistoricSites from 'components/content/HistoricSites.vue'
import HistoricalStory from 'components/content/HistoricalStory.vue'
import HistoricalLiterature from 'components/content/HistoricalLiterature.vue'
import Articles from 'components/content/Articles.vue'
import CulturalRelics from 'components/content/CulturalRelics.vue'
import Search from 'components/content/Search.vue'
import Message from 'components/content/Message.vue'
const routes = [
  // 
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: "/latestnews",
    children: [

      {
        path: "/latestnews",
        name: "LatestNews",
        component: LatestNews,
        meta: {
          title: "最新资讯"
        }
      },
      {
        path: "/characterdeeds",
        name: "CharacterDeeds",
        component: CharacterDeeds,
        meta: {
          title: "人物事迹"
        }
      },
      {
        path: "/historicsites",
        name: "HistoricSites",
        component: HistoricSites,
        meta: {
          title: "历史遗迹"
        }
      },
      {
        path: "/historicalstory",
        name: "HistoricalStory",
        component: HistoricalStory,
        meta: {
          title: "历史影像"
        }
      },
      {
        path: "/historicalliterature",
        name: "HistoricalLiterature",
        component: HistoricalLiterature,
        meta: {
          title: "历史文学"
        }
      },

      {
        path: "/articles",
        name: "Articles",
        component: Articles,
      },
      {
        path: "/culturalrelics",
        name: "CulturalRelics",
        component: CulturalRelics,
      },
      {
        path: "/search",
        name: "Search",
        component: Search,
      },
      {
        path: "/message",
        name: "Message",
        component: Message,
      },

    ]
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// router.beforeEach((to, from, next) => {
//   /* 路由发生变化修改页面title */
//   if (to.meta.title) {
//     document.title = to.meta.title;
//   }
//   next();
// })
export default router
