<template>
  <v-container fluid class="pa-0 gradient-background">
    <v-row no-gutters>
      <!-- Sidebar -->
      <v-col cols="3" class="sidebar d-flex flex-column">
        <div class="pa-4">
          <h2 class="mb-6 white--text">Book’nHaven</h2>
          <v-list dense nav>
            <v-list-item @click="navigateTo('dashboard')" prepend-icon="mdi-view-dashboard"> Dashboard
              <v-list-item-title class="white--text">Dashboard</v-list-item-title>
            </v-list-item>
            <v-list-item @click="navigateTo('account')" prepend-icon="mdi-account"> Manage Account
              <v-list-item-title class="white--text">Manage Account</v-list-item-title>
            </v-list-item>
            <v-list-item @click="navigateTo('bookings')" prepend-icon="mdi-calendar-check"> Bookings
              <v-list-item-title class="white--text">Bookings</v-list-item-title>
            </v-list-item>
            <v-list-item @click="navigateTo('reviews')" prepend-icon="mdi-star"> Reviews
              <v-list-item-title class="white--text">Reviews</v-list-item-title> 
            </v-list-item>
            <v-list-item @click="navigateTo('saved')" prepend-icon="mdi-heart"> Saved
              <v-list-item-title class="white--text">Saved</v-list-item-title>
            </v-list-item>
            <v-list-item @click="navigateTo('notification')" prepend-icon="mdi-bell"> Notification
              <v-list-item-title class="white--text">Notification</v-list-item-title>
            </v-list-item>
            <v-divider class="my-3"></v-divider>
            <v-list-item @click="navigateTo('logout')" prepend-icon="mdi-logout"> Log out
              <v-list-item-title class="white--text">Log out</v-list-item-title>
            </v-list-item>
          </v-list>
        </div>
      </v-col>

      <!-- Main Dashboard Content -->
      <v-col cols="9" class="pa-6 main-content">
        <div class="d-flex justify-space-between align-center mb-6">
          <h2 class="text-h4 font-weight-bold">Dashboard</h2>
          <div class="d-flex align-center">
            <v-avatar size="60" class="mr-2">
              <v-img src="https://randomuser.me/api/portraits/women/44.jpg" />
            </v-avatar>
            <div>
              <h3><strong>Anafe Garcia</strong> </h3>
             <h3>Customer</h3>
            </div>
          </div>
        </div> <hr><br> <br>

        <v-row>
          <v-col cols="12" sm="6" md="4" v-for="(bh, index) in boardingHouses" :key="index">
            <v-card class="rounded-xl gradient-card">
              <v-img :src="bh.image" height="180px" cover />
              <v-card-text>
                <div class="text-h6 font-weight-bold mb-1">{{ bh.name }}</div>
                <div class="text-caption mb-2">{{ bh.description }}</div>
                <div class="text-body-2 font-weight-medium">{{ bh.distance }}</div>
              </v-card-text>
              <v-card-actions class="d-flex justify-space-between">
                <v-btn variant="tonal" color="white" class="text-capitalize">See details</v-btn>
                <v-btn icon color="white">
                  <v-icon>mdi-heart-outline</v-icon>
                </v-btn>
              </v-card-actions>
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

const boardingHouses = ref([
  {
    name: "GARCIA’S BH",
    image: 'https://i.imgur.com/wB3t4aL.jpg',
    description: 'Spacious and air-conditioned rooms with amenities.',
    distance: '1KM from CSU',
  },
  {
    name: "MARQUEZ PLACE",
    image: 'https://i.imgur.com/EiG7sHp.jpg',
    description: 'Affordable rooms for students and professionals.',
    distance: '500m from Gaisano Mall',
  },
  {
    name: "SUNRISE PLACE",
    image: 'https://i.imgur.com/EiG7sHp.jpg',
    description: 'Affordable rooms for students and professionals.',
    distance: '500m from Gaisano Mall',
  }
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
  background: linear-gradient(to right, white, white);
  color:black;
}

.v-list-item-title {
  color: white !important;
}
</style>