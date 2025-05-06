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
              <v-list-item @click="navigateTo('customer')" prepend-icon="mdi-view-dashboard">Dashboard</v-list-item>
              <v-list-item @click="navigateTo('bookings')" prepend-icon="mdi-calendar-check">Bookings</v-list-item>
              <v-list-item @click="navigateTo('saved')" prepend-icon="mdi-heart">Saved</v-list-item>
              <v-list-item @click="navigateTo('notifications')" prepend-icon="mdi-bell">Notification</v-list-item>
              <v-divider class="my-3"></v-divider>
              <v-list-item @click="navigateTo('logout')" prepend-icon="mdi-logout">Log out</v-list-item>
            </v-list>
          </div>
        </v-col>

        <!-- Main Content (Replaced with Notification Layout) -->
        <v-col cols="9" class="pa-6" style="background: linear-gradient(to right, #f5e6f7, #d5c8f2);">
          <div class="d-flex justify-space-between align-center mb-6">
            <h1 class="font-weight-bold">Notification</h1>
            <div class="d-flex align-center">
              <v-avatar size="40">
                <img src="/src/assets/doggy.jpg" alt="Anafie Garcia" style="width: 100%; height: 100%; object-fit: cover;" />
              </v-avatar>
              <div class="ml-3">
                <div style="font-weight: bold;">Anafie Garcia</div>
                <div style="font-size: 12px;">Customer</div>
              </div>
            </div>
          </div>

          <v-card class="mb-4" elevation="2" outlined>
            <v-row no-gutters class="pa-4 align-center">
              <v-col cols="auto">
                <v-icon size="48">mdi-tag</v-icon>
              </v-col>
              <v-col>
                <div>
                  Looking for low prices? We’ve got an entire page dedicated to finding you fantastic place.
                </div>
              </v-col>
            </v-row>
          </v-card>

          <v-card elevation="2" outlined>
            <v-row no-gutters class="pa-4 align-center">
              <v-col cols="auto">
                <v-icon size="48">mdi-tag</v-icon>
              </v-col>
              <v-col>
                <div>
                  We're excited to announce a special promotion exclusively for our loyal customers! For a limited time only, enjoy a 20% discount on select products.
                </div>
              </v-col>
            </v-row>
          </v-card>
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
