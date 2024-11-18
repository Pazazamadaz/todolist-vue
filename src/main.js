import { createApp } from 'vue';
import App from './App.vue';
import router from './router';  // Import the router
import { createPinia } from 'pinia';

import './default.css';  // Keep your app's styling

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.mount('#app');
