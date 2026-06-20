import { createRouter, createWebHistory } from 'vue-router'
import { useUiStore } from '@/stores/ui'

import Layout from '@/layouts/Layout.vue'
// import HomeView from '@/views/Home.vue'
import HomeeView from '@/views/Homee.vue'
import RoomsView from '@/views/Rooms.vue'


const routes = [
    {
        path: '/',
        name: 'Layout',
        component: Layout,
        children: [
            {
                path: '/',
                name: 'HomeeView',
                component: HomeeView
            },
            {
                path: '/rooms',
                name: 'RoomsView',
                component: RoomsView
            }
        ]
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
  // Loader is managed by App.vue which waits for content to actually load
})

export default router;
