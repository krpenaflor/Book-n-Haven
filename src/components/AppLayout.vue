<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/supabase'

const theme = ref('light')
const email = ref('')
const password = ref('')
const isPasswordVisible = ref(false)
const isConfirmPasswordVisible = ref(false)
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

  // OPTIONAL: fetch user role from a 'profiles' table or user metadata
  // For now, we'll route based on manual role selection
  router.push(role === 'owner' ? '/owner' : '/customer')
}


const backgroundClass = computed(() =>
  theme.value === 'light' ? 'dashboard-light' : 'dashboard-dark'
)
</script>

