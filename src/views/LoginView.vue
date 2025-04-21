<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

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

function login() {
  loginError.value = ''
  if (!validateForm()) return

  const dummyUser = {
    email: 'user@example.com',
    password: 'password123',
  }

  if (
    email.value !== dummyUser.email ||
    password.value !== dummyUser.password
  ) {
    loginError.value = "Account doesn't exist with entered email or password"
    return
  }

  router.push('/dashboard')
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

    <!-- Main Content -->
    <v-main>
      <v-container class="d-flex" style="min-height: 80vh;">
        <v-card class="pa-6" max-width="400">
          
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
          <v-form @submit.prevent="login">
  <v-text-field
    v-model="email"
    label="Email"
    type="email"
    variant="outlined"
    :error-messages="errors.email"
    @blur="validateEmail"
    required
  ></v-text-field>

  <v-text-field
    v-model="password"
    label="Password"
    type="password"
    variant="outlined"
    :error-messages="errors.password"
    @focus="validateEmail"
    @blur="validatePassword"
    required
  ></v-text-field>

  <!-- Login Error Box -->
  <div
    v-if="loginError"
    class="mt-3 px-4 py-2"
    style="background-color: transparent; color: red; font-size: 0.875rem; font-family: 'Roboto', sans-serif; border-left: 3px solid red;"
  >
    {{ loginError }}
  </div>

  <v-btn
    class="mt-4"
    type="submit"
    block
    color="primary"
    variant="elevated"
  >
    Login
  </v-btn>

  <div class="text-center mt-4">
    <h5 class="text-subtitle-1">
      Don’t have account?
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
