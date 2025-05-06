<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const theme = ref('light')
const router = useRouter()

function onClick() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}

function navigateTo(route) {
  // Navigate to the selected route
  router.push({ name: route })
}
</script>

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
      <v-row no-gutters style="min-height: 80vh;">
        <!-- Sidebar -->
        <v-col cols="3" style="background-color: #a64ca6; color: white;">
          <div class="pa-4">
            <h2 class="mb-6">Book’nHaven</h2>
            <v-list dense nav>
              <v-list-item @click="navigateTo('dashboard')" prepend-icon="mdi-view-dashboard">Dashboard</v-list-item>
              <v-list-item @click="navigateTo('bookings')" prepend-icon="mdi-calendar-check">Bookings</v-list-item>
              <v-list-item @click="navigateTo('saved')" prepend-icon="mdi-heart">Saved</v-list-item>
              <v-list-item @click="navigateTo('notification')" prepend-icon="mdi-bell">Notification</v-list-item>
              <v-divider class="my-3"></v-divider>
              <v-list-item @click="navigateTo('logout')" prepend-icon="mdi-logout">Log out</v-list-item>
            </v-list>
          </div>
        </v-col>

        <!-- Dashboard Content -->
        <v-col cols="9" class="pa-6" style="background: linear-gradient(to right, #f5e6f7, #d5c8f2);">
          <h1 class="mb-6">DASHBOARD</h1>
          <v-row class="d-flex" justify="start" align="start">
            <v-col cols="12" sm="6" md="4" v-for="bh in 3" :key="bh">
              <v-card class="pa-2">
                <v-img src="https://via.placeholder.com/300x200" height="200px" />
                <v-card-text>
                  Spacious and air-conditioned rooms with amenities. <br />
                  <small>1KM from CSU</small>
                </v-card-text>
                <v-card-actions>
                  <v-btn color="primary" text>See details</v-btn>
                  <v-btn icon><v-icon>mdi-heart-outline</v-icon></v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-main>

    <!-- Footer -->
    <v-footer app class="justify-start px-6">
      2025 - BooknHaven
    </v-footer>
  </v-app>
</template>


<style scoped>
h1 {
  font-weight: bold;
}
</style>