import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
//import { tooltipDirective } from './directives/tooltip-directive'; // Import the custom directive
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles/main.css';


const vuetify = createVuetify({
  components,
  directives,
})
const app = createApp(App)

app.component('VueDatePicker', VueDatePicker);

app.use(router)



app.use(vuetify); // Use Vuetify

app.mount('#app')