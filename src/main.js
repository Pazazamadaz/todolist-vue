import { createApp } from 'vue';
import App from './App.vue';
import router from './router';  // Import the router

import './App.css';  // Keep your app's styling

const app = createApp(App);
app.use(router);  // Use the router
app.mount('#app');
