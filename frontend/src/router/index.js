import { createRouter, createWebHistory } from 'vue-router'
import { useUiStore } from '@/stores/ui'

import HomeView from '@/views/Home.vue'

const routes = [
    {
        path: '/',
        name: 'HomeView',
        component: HomeView
    },
    // {
    //     path: '/admin',
    //     name: 'admin',
    //     component: Admin.LayoutAdminView,
    //     // meta: { requiresAuth: true },
    //     children: [
    //         { path:'/admin', name:'admin-dashboard', component: Admin.DashboardView },
    //         { path:'/admin/blog', name:'admin-blog', component: Admin.BlogView },
    //         { path:'/admin/bookings', name:'admin-bookings', component: Admin.BookingsView },
    //         { path:'/admin/projects', name:'admin-projects', component: Admin.ProjectsView },
    //     ]
    // },
    // {
    //     path: '/:pathMatch(.*)*',
    //     redirect: { name: 'ticket' }
    // }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

router.beforeEach((to, from) => {
  const ui = useUiStore()
  ui.showLoader()

  if (to.meta.requiresAuth) {
    const accessToken = localStorage.getItem('accessToken')
    if (!accessToken) {
      ui.hideLoader()
      return { name: 'home' }
    }
  }
})

router.afterEach(() => {
  const ui = useUiStore()
  requestAnimationFrame(() => {
    ui.hideLoader()
  })
})

export default router;
