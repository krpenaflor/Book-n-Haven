<template>
  <v-container fluid class="pa-0 gradient-background">
    <v-row no-gutters>
      <!-- Sidebar -->
      <v-col cols="3" class="sidebar d-flex flex-column">
        <div class="pa-4">
          <h2 class="mb-6 white--text">Book’nHaven</h2>
          <v-list dense nav>
            <v-list-item @click="navigateTo('dashboard')" class="white--text" prepend-icon="mdi-view-dashboard"> Dashboard
              <v-list-item-title>Dashboard</v-list-item-title>
            </v-list-item>

            <v-list-item @click="navigateTo('account')" class="white--text" prepend-icon="mdi-account"> Manage Account
              <v-list-item-title>Manage Account</v-list-item-title>
            </v-list-item>

            <v-list-item @click="navigateTo('bookings')" class="white--text" prepend-icon="mdi-calendar-check"> Bookings
              <v-list-item-title>Bookings</v-list-item-title>
            </v-list-item>

            <v-list-item @click="navigateTo('reviews')" class="white--text" prepend-icon="mdi-star"> Reviews
              <v-list-item-title>Reviews</v-list-item-title>
            </v-list-item>

            <v-list-item @click="navigateTo('saved')" class="white--text" prepend-icon="mdi-heart">Saved
              <v-list-item-title>Saved</v-list-item-title>
            </v-list-item>

            <v-list-item @click="navigateTo('notification')" class="white--text" prepend-icon="mdi-bell"> Notification
              <v-list-item-title>Notification</v-list-item-title>
            </v-list-item>

            <v-divider class="my-3"></v-divider>

            <v-list-item @click="navigateTo('logout')" class="white--text" prepend-icon="mdi-logout"> Log out
              <v-list-item-title>Log out</v-list-item-title>
            </v-list-item>

            <v-list-item @click="navigateTo('help')" class="white--text" prepend-icon="mdi-help-circle-outline"> Help
              <v-list-item-title>Help</v-list-item-title>
            </v-list-item>
          </v-list>
        </div>
      </v-col>

      <!-- Main Content -->
      <v-col cols="9" class="pa-6 main-content">
        <div class="d-flex justify-space-between align-center mb-6">
          <h2 class="text-h4 font-weight-bold">Saved</h2>
          <div class="d-flex align-center">
            <v-avatar size="60" class="mr-2">
              <v-img src="https://randomuser.me/api/portraits/women/44.jpg" />
            </v-avatar>
            <div>
              <h3><strong>Anafe Garcia</strong> </h3>
             <h3>Customer</h3>
            </div>
          </div>
        </div> <hr><br> <br><br>

        <v-row v-for="(item, index) in savedBHs" :key="index" class="mb-4">
          <v-col cols="12">
            <v-card class="pa-4 d-flex align-center justify-space-between">
              <div class="d-flex">
                <v-img :src="item.image" width="120" height="90" class="rounded-lg mr-4" />
                <div>
                  <h3 class="font-weight-bold mb-1">{{ item.name }}</h3>
                  <div class="text-caption d-flex align-center">
                    <v-icon size="16" class="mr-1" color="red">mdi-map-marker</v-icon>
                    {{ item.location }}
                  </div>
                </div>
              </div>
              <div class="d-flex align-center">
                <div class="text-right mr-4">
                  <div class="font-weight-medium">Very Good</div>
                  <div class="text-caption grey--text">{{ item.reviews }} reviews</div>
                </div>
                <v-sheet color="#c2ffff" rounded class="px-3 py-1 text-h6 font-weight-bold">{{ item.rating }}</v-sheet>
              </div>
              <v-btn color="primary" class="ml-4 text-white text-capitalize">View details</v-btn>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const navigateTo = (route) => {
  router.push({ name: route })
}

const savedBHs = ref([
  {
    name: "GARCIA’S BH",
    image: 'https://i.imgur.com/wB3t4aL.jpg',
    location: 'P-6 Ampayon, BXU',
    rating: '10',
    reviews: 585,
  },
  {
    name: "BH NAME",
    image: 'https://i.imgur.com/EiG7sHp.jpg',
    location: 'P-6 Ampayon, BXU',
    rating: '10',
    reviews: 585,
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