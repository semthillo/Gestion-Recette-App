import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import 'bootstrap/dist/js/bootstrap.js'
import 'bootstrap/dist/css/bootstrap.css'
import App from './App.vue'
import router from './router'
import  fr  from './locale/fr.json'
import  en  from './locale/en.json'
const app = createApp(App)

const i18n = createI18n({
    locale: 'en', 
    fallbackLocale: 'en', 
    messages: {
      en,
      fr
    }
  });

app.use(i18n)
app.use(createPinia())
app.use(router)

app.mount('#app')
