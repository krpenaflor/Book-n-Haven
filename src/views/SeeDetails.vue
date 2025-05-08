<template>
    <v-app :theme="theme">
        <v-app-bar class="px-3" :color="theme === 'light'? 'purple-lighten-5': 'deep-purple-accent-2'">
      <v-spacer></v-spacer>
      <v-btn
        @click="onClick"
        :prepend-icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
        text="Toggle Theme"
        variant="tonal"
      />
    </v-app-bar>
      <v-main >
        <v-container :color="theme === 'light'? 'white': 'blue-lighten-1'" max-width="1000px" class="pa-6">
          <!-- Title & Save Button -->
          <v-row align="center">
    <v-col cols="8">
      <v-card-title class="text-h5 font-weight-bold" style="color: black;">  <!-- Add text color -->
        Boarding House Name
      </v-card-title>
    </v-col>
    <v-col cols="4" class="d-flex justify-end align-center">
      <v-btn icon class="mr-4" @click="toggleSave" :color="isSaved ? 'red' : 'primary'">
        <v-icon>{{ isSaved ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
      </v-btn>
    </v-col>
  </v-row>
  
          <!-- Location -->
          <v-row class="align-center mb-4">
            <v-col cols="auto">
              <v-icon style="color: black;">mdi-crosshairs-gps</v-icon>
            </v-col>
            <v-col>
                <h3 class="mb-0" style="color: black;">Location</h3>
            </v-col>
          </v-row>
  
          <!-- Upper Image (from route params) -->
          <v-row>
            <v-col cols="12">
              <v-img src="img/logo.jpg" height="250px" cover class="rounded-lg"></v-img>
            </v-col>
          </v-row>
  
          <!-- Availability Title -->
          <v-row class="my-6">
            <v-col>
                <h2 class="mb-0" style="color: black;">Availability</h2>
            </v-col>
          </v-row>
  
          <!-- Image and Button Row -->
          <v-row class="align-bottom-img">
            <v-col cols="10">
              <v-img src="/img/up.png" class="responsive-img rounded-lg" />
            </v-col>
            <v-col cols="2" class="d-flex justify-end">
              <v-btn color="primary" variant="tonal" class="mb-6 mr-3">Book now</v-btn>
            </v-col>
          </v-row>
  
          <!-- Bottom image aligned to book button's right -->
          <v-row class="align-bottom-img">
            <v-col cols="10">
              <v-img src="/img/down.png" class="responsive-img rounded-lg" />
            </v-col>
            <v-col cols="2">
                <RouterLink to="customer" :color="theme === 'light'? 'blue-darken-2': 'deep-purple-accent-2'">Go back to Dashboard</RouterLink>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
      <v-footer app class="justify-start px-6" :color="theme === 'light'? 'purple-lighten-5': 'deep-purple-accent-2'">
      2025 - BooknHaven
    </v-footer>
    </v-app>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  
  // Access route parameters
  const route = useRoute()
  
  // Extract the boardingHouse info from the route params
  const boardingHouse = ref({
    name: route.params.name || '',
    image: route.params.image || '',
    // You can add other properties if needed here like description, distance, etc.
  })
  
  const theme = ref('light')
  
  // Toggle save button (logic based on your previous setup)
  const toggleSave = () => {
    // logic for saving or unsaving a boarding house
  }

  const onClick = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}
  </script>
  
  <style scoped>
  .responsive-img {
    object-fit: contain;
    width: 100%;
    height: auto;
  }
  
  .align-bottom-img {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
  </style>
  
  
  <style scoped>
  .v-container {
    background: linear-gradient(to right, #f3eaff, #e0d4f7);
    border-radius: 12px;
  }
  </style>
  