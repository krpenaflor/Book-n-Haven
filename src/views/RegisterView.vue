<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const theme = ref('light')

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const errors = ref({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const registerError = ref('')
const validEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function onClick() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}

function validateFirstName() {
  errors.value.firstName = firstName.value ? '' : 'First name is required'
}

function validateLastName() {
  errors.value.lastName = lastName.value ? '' : 'Last name is required'
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

function validateConfirmPassword() {
  if (!confirmPassword.value) {
    errors.value.confirmPassword = 'Please confirm your password'
  } else if (confirmPassword.value !== password.value) {
    errors.value.confirmPassword = 'Passwords do not match'
  } else {
    errors.value.confirmPassword = ''
  }
}

function validateForm() {
  validateFirstName()
  validateLastName()
  validateEmail()
  validatePassword()
  validateConfirmPassword()

  return Object.values(errors.value).every(err => err === '')
}

function register() {
  registerError.value = ''
  if (!validateForm()) return

  // Simulate successful registration
  router.push('/login')
}
</script>




<template>
    <v-app :theme="theme">
      <v-app-bar class="px-3">
        <v-spacer></v-spacer>
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
              <h1 class="text-h5 font-weight-bold">Welcome to BooknHaven</h1>
            </div>
  
            <v-form @submit.prevent="register">
              <v-text-field
  v-model="firstName"
  label="First Name"
  variant="outlined"
  :error-messages="errors.firstName"
  @blur="validateFirstName"
  required
/>

<v-text-field
  v-model="lastName"
  label="Last Name"
  variant="outlined"
  :error-messages="errors.lastName"
  @blur="validateLastName"
  required
/>

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

<v-text-field
  v-model="confirmPassword"
  label="Confirm Password"
  type="password"
  variant="outlined"
  :error-messages="errors.confirmPassword"
  @focus="validatePassword"
  @blur="validateConfirmPassword"
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
  
              <v-btn class="mt-4" type="submit" block color="primary" variant="elevated">
                Register
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
  
