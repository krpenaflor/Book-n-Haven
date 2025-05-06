<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/supabase'

const theme = ref('light')
const email = ref('')
const password = ref('')
const errors = ref({ email: '', password: '' })
const loginError = ref('')

const router = useRouter()

const validEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function onClick() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}

function validateEmail() {
  if (!email.value) {
    errors.value.email = 'Email is required'
  } else if (!validEmailRegex.test(email.value)) {
    errors.value.email = 'Email must be valid'
  } else {
    errors.value.email = ''
  }
}

function validatePassword() {
  if (!password.value) {
    errors.value.password = 'Password is required'
  } else if (password.value.length < 8) {
    errors.value.password = 'Password must be at least 8 characters'
  } else {
    errors.value.password = ''
  }
}

function validateForm() {
  validateEmail()
  validatePassword()
  return !errors.value.email && !errors.value.password
}

function login(role) {
  loginError.value = ''
  if (!validateForm()) return

  const storedUsers = JSON.parse(localStorage.getItem('users') || '[]')

  const matchedUser = storedUsers.find(
    user =>
      user.email.toLowerCase().trim() === email.value.toLowerCase().trim() &&
      user.password === password.value &&
      user.role === role
  )

  if (!matchedUser) {
    loginError.value = "Account doesn't exist with entered email, password, or role"
    return
  }

  router.push(role === 'owner' ? '/owner' : '/customer')
}

const backgroundClass = computed(() =>
  theme.value === 'light' ? 'dashboard-light' : 'dashboard-dark'
)
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

    <!-- Main Content -->
    <v-main :class="backgroundClass">
      <v-container class="fill-height d-flex justify-center align-center">
        <v-card class="pa-6 fixed-card" max-width="400" elevation="10">
          <!-- Logo + Title -->
          <div class="text-center mb-4">
            <v-img
              src="/src/assets/logo.jpg"
              alt="Logo"
              max-height="100"
              contain
              class="mb-4 mx-auto"
            />
            <h1 class="text-h5 font-weight-bold">Welcome to BooknHaven</h1>
          </div>

          <!-- Login Form -->
          <v-form @submit.prevent>
            <v-text-field
              v-model="email"
              label="Email"
              type="email"
              variant="outlined"
              :error-messages="errors.email"
              @blur="validateEmail"
              required
            />

            <v-text-field
              v-model="password"
              label="Password"
              type="password"
              variant="outlined"
              :error-messages="errors.password"
              @focus="validateEmail"
              @blur="validatePassword"
              required
            />

            <!-- Error Box -->
            <div
              v-if="loginError"
              class="mt-3 px-4 py-2"
              style="background-color: transparent; color: red; font-size: 0.875rem; font-family: 'Roboto', sans-serif; border-left: 3px solid red;"
            >
              {{ loginError }}
            </div>

            <v-btn
              class="mt-1"
              block
              color="primary"
              variant="elevated"
              @click="login('customer')"
            >
              Login as Customer
            </v-btn>

            <v-btn
              class="mt-1"
              block
              color="primary"
              variant="elevated"
              @click="login('owner')"
            >
              Login as Owner
            </v-btn>

            <div class="text-center mt-4">
              <h5 class="text-subtitle-1">
                Don’t have an account?
                <RouterLink to="/register" class="text-primary text-decoration-none">
                  Click here to Register
                </RouterLink>
              </h5>
            </div>
          </v-form>
        </v-card>
      </v-container>
    </v-main>

    <!-- Footer -->
    <v-footer app class="justify-start px-6">
      2025 - BooknHaven
    </v-footer>
  </v-app>
</template>

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
