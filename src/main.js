import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config'

import InputNumber from 'primevue/inputnumber';
import ToastService from 'primevue/toastservice'
import Toast from 'primevue/toast'
import Button from "primevue/button"

const app = createApp(App)

app.use(PrimeVue)
app.use(ToastService)
app.component("Button", Button)
app.component("InputNumber", InputNumber)
app.component("Toast", Toast)

app.mount('#app')