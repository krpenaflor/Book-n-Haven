import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Vuetify
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import App from './App.vue'
import router from './router'

import { createClient } from '@supabase/supabase-js'

const supabase = createClient('https://your-project-url.supabase.co', 'public-anon-key')

// Fetching data from a table
async function getPosts() {
  const { data, error } = await supabase
    .from('posts')
    .select('*')

  if (error) {
    console.error('Error fetching posts:', error)
  } else {
    console.log('Fetched posts:', data)
  }
}

// Saving a post
async function savePost(postData) {
  const { data, error } = await supabase
    .from('posts')
    .insert([postData])

  if (error) {
    console.error('Error saving post:', error)
  } else {
    console.log('Saved post:', data)
  }
}



const app = createApp(App)

const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi', // This is already the default value - only for display purposes
  },
  components,
  directives,
})

app.use(createPinia())
app.use(router)
app.use(vuetify)

app.mount('#app')
