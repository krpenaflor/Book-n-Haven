import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import CustomerDashboard from '@/views/CustomerDashboard.vue'
import OwnerDashboard from '@/views/OwnerDashboard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/login' }, // Default route
    { path: '/login', name: 'login', component: LoginView },
    { path: '/register', name: 'register', component: RegisterView },
    { path: '/customer', name: 'customer', component: CustomerDashboard },
    { path: '/owner', name: 'owner', component: OwnerDashboard },
    // Optional:
    // { path: '/dashboard', name: 'dashboard', component: DashboardView },
  ],
})

export default router
