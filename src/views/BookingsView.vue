<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const theme = ref('light')
const router = useRouter()

function onClick() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}

function navigateTo(route) {
  router.push({ name: route })
}

const bookings = [
  {
    id: 1,
    name: "GARCIA'S BH",
    status: 'Completed',
    date: 'May 1',
    price: '₱1,500',
    image: 'https://via.placeholder.com/150'
  },
  {
    id: 2,
    name: 'BH NAME',
    status: 'Cancelled',
    date: 'May 17',
    price: '₱2,000',
    image: 'https://via.placeholder.com/150'
  }
]
</script>

<template>
  <v-app :theme="theme">
    <!-- App Bar -->
    <v-app-bar class="px-3">
      <v-toolbar-title>Book’nHaven</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        @click="onClick"
        :prepend-icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
        text="Toggle Theme"
        variant="tonal">
      </v-btn>
    </v-app-bar>

    <v-main class="d-flex">
      <!-- Sidebar -->
      <div class="pa-4" style="width: 250px; background-color: #a64ca6; color: white;">
        <h2 class="mb-6">Book’nHaven</h2>
        <v-list dense nav>
          <v-list-item @click="navigateTo('customer')" prepend-icon="mdi-view-dashboard">Dashboard</v-list-item>
          <v-list-item @click="navigateTo('bookings')" prepend-icon="mdi-calendar-check">Bookings</v-list-item>
          <v-list-item @click="navigateTo('saved')" prepend-icon="mdi-heart">Saved</v-list-item>
          <v-list-item @click="navigateTo('notification')" prepend-icon="mdi-bell">Notification</v-list-item>
          <v-divider class="my-3"></v-divider>
          <v-list-item @click="navigateTo('login')" prepend-icon="mdi-logout">Log out</v-list-item>
        </v-list>
      </div>

      <!-- Main Content -->
      <v-container fluid>
        <h1 class="mt-6 mb-4">BOOKINGS</h1>
        <v-row>
          <v-col cols="12" sm="6" md="4" v-for="bh in 3" :key="bh">
            <v-card>
              <v-img src="https://via.placeholder.com/300x200" height="200px" />
            </v-card>
          </v-col>
        </v-row>

        <!-- Bookings Section -->
        <h3 class="mt-6 mb-3">Butuan City</h3>
        <v-row>
          <v-col cols="12" md="6" v-for="booking in bookings" :key="booking.id">
            <v-card class="mb-4">
              <v-img :src="booking.image" height="200px" class="rounded-t mx-auto" contain></v-img>
              <v-card-text>
                <div class="d-flex justify-space-between">
                  <div>
                    <h3>{{ booking.name }}</h3>
                    <p>Status: {{ booking.status }}</p>
                    <p>Date: {{ booking.date }}</p>
                  </div>
                  <div class="text-right">
                    <h3>{{ booking.price }}</h3>
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <!-- Footer -->
    <v-footer app class="justify-start px-6">
      2025 - BooknHaven
    </v-footer>
  </v-app>
</template>

<style scoped>
h1, h2, h3 {
  font-weight: bold;
  margin: 0;
}
p {
  margin: 4px 0;
}
</style>
