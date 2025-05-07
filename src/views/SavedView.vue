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

        <!-- Main Content -->
        <v-col cols="9" class="pa-6" :class="[theme === 'dark' ? 'dashboard-dark' : 'dashboard-light']">
          <div class="d-flex justify-space-between align-center mb-6">
            <h2 class="text-h4 font-weight-bold">Saved</h2>
            
          </div>

          <hr /><br />
          
          <!-- Saved Boarding Houses -->
          <v-row v-if="savedBHs.length">
            <v-col
              v-for="(item, index) in savedBHs"
              :key="index"
              cols="12"
              class="mb-4"
            >
              <v-card class="pa-4">
                <v-row no-gutters class="pa-4 align-center">
                  <v-col cols="3">
                    <v-img :src="item.image" height="100" class="rounded-lg" cover />
                  </v-col>
                  <v-col cols="6">
                    <div class="font-weight-bold text-subtitle-1 mb-1">{{ item.name }}</div>
                    <div class="d-flex align-center mb-1">
                      <v-icon color="red" size="16" class="mr-1">mdi-map-marker</v-icon>
                      <span class="text-caption">{{ item.location }}</span>
                    </div>
                    <div class="text-caption grey--text">{{ item.reviews }} reviews • Very Good</div>
                  </v-col>
                  <v-col cols="3" class="d-flex flex-column justify-center align-end">
                    <v-sheet color="#c2ffff" rounded class="px-3 py-1 text-h6 font-weight-bold mb-2">
                      {{ item.rating }}
                    </v-sheet>
                    <v-btn color="primary" class="text-white text-none" small>View details</v-btn>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>

          <!-- Empty State for Saved Boarding Houses -->
          <v-row v-else>
            <v-col cols="12">
              <v-alert type="info" border="left" colored-border>
                No saved boarding houses.
              </v-alert>
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

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const theme = ref('light')  // Theme variable for light/dark theme toggling
const router = useRouter()

const onClick = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'  // Toggle between light and dark themes
}

const navigateTo = (route) => {
  router.push({ name: route })  // Navigate to the specified route
}

// Sample user data
const user = ref({
  name: 'Anafe Garcia',
  role: 'Customer',
  avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
})

// Saved Boarding Houses data
const savedBHs = ref([
  {
    name: 'GARCIA’S BH',
    image: '/src/assets/logo.jpg',
    location: 'P-6 Ampayon, BXU',
    rating: '10',
    reviews: 585,
  },
  {
    name: 'BH NAME',
    image: '/src/assets/logo.jpg',
    location: 'P-6 Ampayon, BXU',
    rating: '10',
    reviews: 585,
  },
])
</script>

<style scoped>
/* Background Gradient for the SavedView */
.dashboard-light {
  background: linear-gradient(to right, #f5e6f7, #d5c8f2);
  color: black;
}

.dashboard-dark {
  background: linear-gradient(to right, #1c1b2f, #3e2f54);
  color: white;
}

.sidebar {
  background: linear-gradient(to bottom, #6c4cd0, #8b6cd6);
  height: 100vh;
  color: white;
}

.v-list-item-title {
  color: white !important;
}
</style>
