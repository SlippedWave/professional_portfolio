import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { MotionPlugin } from "@vueuse/motion";

import './assets/styles/custom.scss';
import i18n from "./i18n";

const app = createApp(App)

app.use(i18n);
app.use(router);
app.use(MotionPlugin);

app.mount('#app');
