<template>
  <v-container fluid class="pa-0 gradient-background">
    <v-row no-gutters>
      <!-- Sidebar -->
      <v-col cols="3" class="sidebar d-flex flex-column">
        <div class="pa-4">
          <h2 class="mb-6 white--text">Book’nHaven</h2>
          <v-list dense nav>
            <v-list-item @click="navigateTo('dashboard')" class="white--text" prepend-icon="mdi-view-dashboard">Dashboard
              <v-list-item-title>Dashboard</v-list-item-title>
            </v-list-item>

            <v-list-item @click="navigateTo('account')" class="white--text" prepend-icon="mdi-account">Manage Account
              <v-list-item-title>Manage Account</v-list-item-title>
            </v-list-item>

            <v-list-item @click="navigateTo('bookings')" class="white--text" prepend-icon="mdi-calendar-check">Bookings
              <v-list-item-title>Bookings</v-list-item-title>
            </v-list-item>

            <v-list-item @click="navigateTo('reviews')" class="white--text" prepend-icon="mdi-star">Reviews
              <v-list-item-title>Reviews</v-list-item-title>
            </v-list-item>

            <v-list-item @click="navigateTo('saved')" class="white--text" prepend-icon="mdi-heart">Saved
              <v-list-item-title>Saved</v-list-item-title>
            </v-list-item>

            <v-list-item @click="navigateTo('notification')" class="white--text" prepend-icon="mdi-bell">Notification
              <v-list-item-title>Notification</v-list-item-title>
            </v-list-item>

            <v-divider class="my-3"></v-divider>

            <v-list-item @click="navigateTo('logout')" class="white--text" prepend-icon="mdi-logout">Log out
              <v-list-item-title>Log out</v-list-item-title>
            </v-list-item>

            <v-list-item @click="navigateTo('help')" class="white--text" prepend-icon="mdi-help-circle-outline">Help
              <v-list-item-title>Help</v-list-item-title>
            </v-list-item>
          </v-list>
        </div>
      </v-col>

      <!-- Main Content -->
      <v-col cols="9" class="pa-6">
        <div class="d-flex justify-space-between align-center mb-6">
          <h2 class="text-h4 font-weight-bold">Bookings</h2>
          <div class="d-flex align-center">
            <v-avatar size="60" class="mr-2">
              <v-img src="https://randomuser.me/api/portraits/women/44.jpg" />
            </v-avatar>
            <div>
              <h3><strong>Anafe Garcia</strong> </h3>
             <h3>Customer</h3>
            </div>
          </div>
        </div> <hr><br>

        <h3 class="mt-6 font-weight-bold">Butuan City</h3>

        <div v-for="booking in bookings" :key="booking.date" class="mt-4">
          <div class="text-subtitle-1 mb-2 font-weight-medium">{{ booking.date }}</div>
          <v-card class="pa-3 rounded-xl gradient-card d-flex align-center" flat>
            <v-img :src="booking.image" width="100" height="100" class="rounded-lg mr-4" />
            <div class="flex-grow-1">
              <div class="text-h6 font-weight-bold">{{ booking.name }}</div>
              <div class="text-caption">{{ booking.status }}</div>
            </div>
            <div class="text-h6 font-weight-bold">₱{{ booking.price.toLocaleString() }}</div>
          </v-card>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const navigateTo = (route) => {
  // Add validation if your route names differ
  router.push({ name: route })
}

const bookings = ref([
  {
    date: 'May 1',
    name: "GARCIA’S BH",
    status: 'Completed',
    price: 1500,
    image: 'https://i.imgur.com/wB3t4aL.jpg',
  },
  {
    date: 'May 17',
    name: 'BH NAME',
    status: 'Cancelled',
    price: 2000,
    image: 'https://i.imgur.com/EiG7sHp.jpg',
  },
])
</script>

<style scoped>
.gradient-background {
  background: linear-gradient(to right, #e5c0ff, #f1d4fa);
  min-height: 100vh;
}

.sidebar {
  background: linear-gradient(to bottom, #6c4cd0, #8b6cd6);
  height: 100vh;
  color: white;
}

.gradient-card {
  background: linear-gradient(to right, #a672e4, #ce8ddc);
  color: white;
}

.v-list-item-title {
  color: white !important;
}
</style>