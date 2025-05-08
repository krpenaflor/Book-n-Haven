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
              <v-list-item @click="navigateTo('customer')" class="white--text" prepend-icon="mdi-view-dashboard">
                Dashboard
              </v-list-item>
              <v-list-item @click="navigateTo('bookings')" class="white--text" prepend-icon="mdi-calendar-check">
                Bookings
              </v-list-item>
              <v-list-item @click="navigateTo('saved')" class="white--text" prepend-icon="mdi-heart">
                Saved
              </v-list-item>
              <v-list-item @click="navigateTo('notification')" class="white--text" prepend-icon="mdi-bell">
                Notification
              </v-list-item>
              <v-divider class="my-3"></v-divider>
              <v-list-item @click="navigateTo('login')" class="white--text" prepend-icon="mdi-logout">
                Log out
              </v-list-item>
            </v-list>
          </div>
        </v-col>

        <!-- Main Dashboard Content -->
        <v-col cols="9" :class="[theme === 'dark' ? 'dashboard-dark' : 'dashboard-light', 'pa-6']">
          <div class="d-flex justify-space-between align-center mb-6">
            <h2 class="text-h4 font-weight-bold">Dashboard</h2>
          </div>
          <hr /><br /><br />

          <v-row>
            <v-col cols="12" sm="6" md="4" v-for="(bh, index) in boardingHouses" :key="index">
              <v-card class="rounded-xl fixed-card">
                <v-img
  :src="bh.image"
  height="180px"
  cover
  class="cursor-pointer"
  @click="router.push({ name: 'details', params: { id: bh.name } })"
/>

                <v-card-text>
                  <div class="text-h6 font-weight-bold mb-1">{{ bh.name }}</div>
                  <div class="text-caption mb-2">{{ bh.description }}</div>
                  <div class="text-body-2 font-weight-medium">{{ bh.distance }}</div>
                </v-card-text>
                <v-card-actions class="d-flex justify-space-between">
                  <v-btn variant="tonal" color="primary" class="text-capitalize" @click="router.push({ name: 'details', params: { id: bh.name } })">See details</v-btn>

                  <v-btn icon @click="toggleSave(bh)" :color="isSaved(bh) ? 'red' : 'primary'">
                    <v-icon>{{ isSaved(bh) ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
                  </v-btn>
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

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/supabase'

const router = useRouter()
const theme = ref('light')

const onClick = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}

const navigateTo = (route) => {
  router.push({ name: route })
}

const fullName = ref('')
const savedList = ref([])

const boardingHouses = ref([
  {
    name: "GARCIA’S BH",
    image: '/img/1.jpg',
    description: 'Spacious and air-conditioned rooms with amenities.',
    distance: '1KM from CSU',
  },
  {
    name: "MARQUEZ PLACE",
    image: '/img/2.jpg',
    description: 'Affordable rooms for students and professionals.',
    distance: '500m from Gaisano Mall',
  },
  {
    name: "SUNRISE PLACE",
    image: '/img/3.jpg',
    description: 'Affordable rooms for students and professionals.',
    distance: '500m from Gaisano Mall',
  }
])

onMounted(async () => {
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) {
    fullName.value = 'Welcome User'
    return
  }

  const firstName = user.user_metadata?.firstName || ''
  const lastName = user.user_metadata?.lastName || ''
  fullName.value = `${firstName} ${lastName}`.trim()

  const { data, error: fetchError } = await supabase
    .from('saved_boarding_houses')
    .select('name')
    .eq('user_id', user.id)

  if (!fetchError && data) {
    savedList.value = data.map(item => item.name)
  }
})

const toggleSave = async (bh) => {
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) return

  const alreadySaved = savedList.value.includes(bh.name)

  if (alreadySaved) {
    await supabase
      .from('saved_boarding_houses')
      .delete()
      .match({ user_id: user.id, name: bh.name })

    savedList.value = savedList.value.filter(name => name !== bh.name)
  } else {
    await supabase
      .from('saved_boarding_houses')
      .insert([{
        user_id: user.id,
        name: bh.name,
        image: bh.image,
        description: bh.description,
        distance: bh.distance
      }])

    savedList.value.push(bh.name)
  }
}

const isSaved = (bh) => savedList.value.includes(bh.name)
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
