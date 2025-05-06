<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/supabase'

const theme = ref('light')
const firstName = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const registerError = ref('')
const errors = ref({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const router = useRouter()
const validEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function onClick() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}

function validateForm() {
  errors.value = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  }

  let valid = true

  if (!firstName.value) {
    errors.value.firstName = 'First name is required'
    valid = false
  }

  if (!lastName.value) {
    errors.value.lastName = 'Last name is required'
    valid = false
  }

  if (!email.value) {
    errors.value.email = 'Email is required'
    valid = false
  } else if (!validEmailRegex.test(email.value)) {
    errors.value.email = 'Email must be valid'
    valid = false
  }

  if (!password.value) {
    errors.value.password = 'Password is required'
    valid = false
  } else if (password.value.length < 8) {
    errors.value.password = 'Password must be at least 8 characters'
    valid = false
  }

  if (!confirmPassword.value) {
    errors.value.confirmPassword = 'Please confirm your password'
    valid = false
  } else if (password.value !== confirmPassword.value) {
    errors.value.confirmPassword = 'Passwords do not match'
    valid = false
  }

  return valid
}

async function register(role) {
  registerError.value = ''
  if (!validateForm()) return

  const { data, error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
    options: {
      data: {
        firstName: firstName.value,
        lastName: lastName.value,
        role: role,
      },
    },
  })

  if (error) {
    registerError.value = error.message
    return
  }

  router.push(role === 'owner' ? '/owner' : '/customer')
}

</script>

<template>
  <v-app :theme="theme">
    <v-app-bar class="px-3">
      <v-spacer />
      <v-btn
        @click="onClick"
        :prepend-icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
        text="Toggle Theme"
        variant="tonal"
      >
        Toggle Theme
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container class="d-flex justify-center align-center" style="min-height: 80vh;">
        <v-card class="pa-6" max-width="400">
          <div class="text-center mb-4">
            <v-img
              src="/src/assets/logo.jpg"
              alt="Logo"
              max-height="100"
              contain
              class="mb-4 mx-auto"
            />
            <h1 class="text-h5 font-weight-bold">Register to BooknHaven</h1>
          </div>

          <v-form @submit.prevent>
            <v-text-field
              v-model="firstName"
              label="First Name"
              variant="outlined"
              :error-messages="errors.firstName"
              required
            />
            <v-text-field
              v-model="lastName"
              label="Last Name"
              variant="outlined"
              :error-messages="errors.lastName"
              required
            />
            <v-text-field
              v-model="email"
              label="Email"
              type="email"
              variant="outlined"
              :error-messages="errors.email"
              required
            />
            <v-text-field
              v-model="password"
              label="Password"
              type="password"
              variant="outlined"
              :error-messages="errors.password"
              required
            />
            <v-text-field
              v-model="confirmPassword"
              label="Confirm Password"
              type="password"
              variant="outlined"
              :error-messages="errors.confirmPassword"
              required
            />

            <!-- Error Box -->
            <div
              v-if="registerError"
              class="mt-3 px-4 py-2"
              style="background-color: transparent; color: red; font-size: 0.875rem; font-family: 'Roboto', sans-serif; border-left: 3px solid red;"
            >
              {{ registerError }}
            </div>

            <v-btn
              class="mt-1"
              block
              color="primary"
              variant="elevated"
              @click="register('customer')"
            >
              Register as Customer
            </v-btn>

            <v-btn
              class="mt-1"
              block
              color="primary"
              variant="elevated"
              @click="register('owner')"
            >
              Register as Owner
            </v-btn>

            <div class="text-center mt-4">
              <h5 class="text-subtitle-1">
                Already have an account?
                <RouterLink to="/login" class="text-primary text-decoration-none">
                  Click here to Login
                </RouterLink>
              </h5>
            </div>
          </v-form>
        </v-card>
      </v-container>
    </v-main>

    <v-footer app class="justify-start px-6">
      2025 - BooknHaven
    </v-footer>
  </v-app>
</template>
