import App from "./App.vue";
import { createApp } from "vue";
import store from "./store";

const app = createApp(App);
app.mount("#app");
app.use(store);
