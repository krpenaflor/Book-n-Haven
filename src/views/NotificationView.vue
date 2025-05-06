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

        <!-- Main Content (Replaced with Notification Layout) -->
        <v-col cols="9" class="pa-6" style="background: linear-gradient(to right, #f5e6f7, #d5c8f2);">
          <div class="d-flex justify-space-between align-center mb-6">
          <h2 class="text-h4 font-weight-bold">Notification</h2>
          <div class="d-flex align-center">
            <v-avatar size="60" class="mr-2">
              <v-img src="https://randomuser.me/api/portraits/women/44.jpg" />
            </v-avatar>
            <div>
              <h3><strong>Anafe Garcia</strong> </h3>
             <h3>Customer</h3>
            </div>
          </div>
        </div>
<hr>  <br>
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