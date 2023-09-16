import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import 'vuetify/styles/main.css';
import vue3GoogleLogin from 'vue3-google-login'
import store from './store'; 

const CLIENT_ID ="427699617070-430antvlo692382opet6dafaj1f5m9rs.apps.googleusercontent.com"

const vuetify = createVuetify({
  components,
  directives,
});
const app = createApp(App);

app.component('VueDatePicker', VueDatePicker);

app.use(router);
app.use(store); // Use the Vuex store
app.use(vuetify); // Use Vuetify

app.use(vue3GoogleLogin, {
  clientId: CLIENT_ID,});

app.mount('#app');
