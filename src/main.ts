import { createApp } from 'vue'
import { createPinia } from 'pinia'

import naive from 'naive-ui/es/preset'

import App from './App.vue'
import router from './router'

// 通用字体
import 'vfonts/Lato.css'
// 等宽字体
import 'vfonts/FiraCode.css'



const app = createApp(App)

app.use(createPinia())
// app.use(router)
app.use(naive)

app.mount('#app')
