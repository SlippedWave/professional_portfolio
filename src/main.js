import './assets/styles/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { MotionPlugin } from "@vueuse/motion";
import i18n from "./i18n";

const app = createApp(App)

app.use(i18n);
app.use(router);
app.use(MotionPlugin);

app.mount('#app');
