import 'normalize.css';
import { createPinia } from 'pinia';
import 'virtual:uno.css';
import { createApp } from 'vue';

import App from './App.vue';
import router from './router';

async function bootstrap() {
  const app = createApp(App);

  app.use(createPinia());
  app.use(router);

  app.mount('#app');
}

bootstrap();
