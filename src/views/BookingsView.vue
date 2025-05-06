<template>
  <v-app :theme="theme">
    <!-- App Bar -->
    <v-app-bar class="px-3">
      <v-spacer></v-spacer>
      <v-btn
        @click="onClick"
        :prepend-icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
        text="Toggle Theme"
        variant="tonal"
      />
    </v-app-bar>

    <v-main>
      <v-row no-gutters>
        <!-- Sidebar -->
        <v-col cols="3" class="sidebar d-flex flex-column">
          <div class="pa-4">
            <h2 class="mb-6 white--text">Book’nHaven</h2>
            <v-list dense nav>
              <v-list-item @click="navigateTo('customer')" class="white--text" prepend-icon="mdi-view-dashboard">Dashboard
                <v-list-item-title></v-list-item-title>
              </v-list-item>
              <v-list-item @click="navigateTo('bookings')" class="white--text" prepend-icon="mdi-calendar-check">Bookings
                <v-list-item-title></v-list-item-title>
              </v-list-item>
              <v-list-item @click="navigateTo('saved')" class="white--text" prepend-icon="mdi-heart">Saved
                <v-list-item-title></v-list-item-title>
              </v-list-item>
              <v-list-item @click="navigateTo('notification')" class="white--text" prepend-icon="mdi-bell">Notification
                <v-list-item-title></v-list-item-title>
              </v-list-item>
              <v-divider class="my-3"></v-divider>
              <v-list-item @click="navigateTo('login')" class="white--text" prepend-icon="mdi-logout">Log out
                <v-list-item-title></v-list-item-title>
              </v-list-item>
            </v-list>
          </div>
        </v-col>

        <!-- Main Content -->
        <v-col cols="9" :class="[theme === 'dark' ? 'dashboard-dark' : 'dashboard-light', 'pa-6']">
          <div class="d-flex justify-space-between align-center mb-6">
            <h2 class="text-h4 font-weight-bold">Bookings</h2>
            <div class="d-flex align-center">
              <v-avatar size="60" class="mr-2">
                <v-img src="https://randomuser.me/api/portraits/women/44.jpg" />
              </v-avatar>
              <div>
                <h3><strong>Anafe Garcia</strong></h3>
                <h3>Customer</h3>
              </div>
            </div>
          </div>

          <hr /><br /><br />
          <h3 class="mt-6 font-weight-bold">Butuan City</h3>

          <div v-for="booking in bookings" :key="booking.date" class="mt-4">
            <div class="text-subtitle-1 mb-2 font-weight-medium">{{ booking.date }}</div>
            <v-card class="pa-3 rounded-xl fixed-card d-flex align-center" flat>
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
    </v-main>

    <v-footer app class="justify-start px-6">
      2025 - BooknHaven
    </v-footer>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const theme = ref('light')

const onClick = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}

const navigateTo = (route) => {
  router.push({ name: route })
}

const bookings = ref([
  {
    date: 'May 1',
    name: "GARCIA’S BH",
    status: 'Completed',
    price: 1500,
    image: 'src/assets/logo.jpg',
  },
  {
    date: 'May 17',
    name: 'BH NAME',
    status: 'Cancelled',
    price: 2000,
    image: 'src/assets/logo.jpg',
  },
])
</script>

<style scoped>
.sidebar {
  background: linear-gradient(to bottom, #6c4cd0, #8b6cd6);
  height: 100vh;
  color: white;
}

.fixed-list {
  background-color: transparent !important;
}

.fixed-card {
  background: linear-gradient(to right, white, white);
  color: black;
}

.dashboard-light {
  background: linear-gradient(to right, #f9f1ff, #eae3fa);
  color: black;
}

.dashboard-dark {
  background: linear-gradient(to right, #1c1b2f, #3e2f54);
  color: white;
}

.v-list-item-title {
  font-weight: 500;
}
</style>
