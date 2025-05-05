<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const theme = ref('light')
const router = useRouter()


function onClick() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}



</script>


<template>
  <v-app :theme="theme">
    <!-- App Bar with Theme Toggle -->
    <v-app-bar class="px-3">
      <v-spacer></v-spacer>
      <v-btn
        @click="onClick"
        :prepend-icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
        text="Toggle Theme"
        variant="tonal">
      </v-btn>
    </v-app-bar>



    <!-- Footer -->
    <v-footer app class="justify-start px-6">
      2025 - BooknHaven
    </v-footer>
  </v-app>
</template>