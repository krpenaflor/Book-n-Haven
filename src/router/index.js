import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import CustomerDashboard from '@/views/CustomerDashboard.vue'
import OwnerDashboard from '@/views/OwnerDashboard.vue'
import BookingsView from '@/views/BookingsView.vue'
import SavedView from '@/views/SavedView.vue'
import NotificationView from '@/views/NotificationView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/login' }, // Default route
    { path: '/login', name: 'login', component: LoginView },
    { path: '/register', name: 'register', component: RegisterView },
    { path: '/customer', name: 'customer', component: CustomerDashboard },
    { path: '/owner', name: 'owner', component: OwnerDashboard },
  { path: '/bookings', name: 'bookings', component: BookingsView },
  { path: '/saved', name: 'saved', component: SavedView },
  { path: '/notification', name: 'notification', component: NotificationView },
  {
    path: '/details',
    name: 'details',
    component: () => import('@/views/SeeDetails.vue')
  }
  
  
  

  
   
  // Optional:
    // { path: '/dashboard', name: 'dashboard', component: DashboardView },
  ],
})

export default router
