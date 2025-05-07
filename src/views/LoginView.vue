<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/supabase'

const theme = ref('light')
const email = ref('')
const password = ref('')
const isPasswordVisible = ref(false)
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

async function login(role) {
  loginError.value = ''
  if (!validateForm()) return

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value
  })

  if (error) {
    loginError.value = error.message
    return
  }

  router.push(role === 'owner' ? '/owner' : '/customer')
}


</script>

<template>
  <v-app :theme="theme">
    <v-app-bar class="px-3" :color="theme === 'light'? 'purple-lighten-5': 'deep-purple-accent-2'" >
      <v-spacer></v-spacer>
      <v-btn
        @click="onClick"
        :icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
        variant="elevated"
        slim
      />
    </v-app-bar>

    <v-main>
      <v-container class="fill-height d-flex justify-center align-center" >
        <v-card :color="theme === 'light'? 'deep-purple-accent-2': 'black'" :class="'pa-6'" max-width="400" elevation="10">
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

          <v-form @submit.prevent>
            <v-text-field
              v-model="email"
              label="Email"
              type="email"
              variant="outlined"
              :error-messages="errors.email"
              @blur="validateEmail"
              required
              class="custom-text-field"
            />
            <v-text-field
              v-model="password"
              label="Password"
              variant="outlined"
              :type="isPasswordVisible ? 'text' : 'password'"
              :error-messages="errors.password"
              :append-inner-icon="isPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'"
              @click:append-inner="isPasswordVisible = !isPasswordVisible"
              required
              class="custom-text-field"
            />

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
  :color="theme === 'light'? 'purple-lighten-5': 'deep-purple-accent-2'"
  variant="elevated"
  @click="login('owner')"
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

    <v-footer app class="justify-start px-6" :color="theme === 'light'? 'purple-lighten-5': 'deep-purple-accent-2'">
      2025 - BooknHaven
    </v-footer>
  </v-app>
</template>
