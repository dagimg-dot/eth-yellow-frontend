import { createApp } from "vue";

import App from "./App.vue";
import router from "@/router";
import vuetify from "@/plugins/vuetify";
import "@/@iconify/icons-bundle";
import "./scss/main.scss";
import { defaultApolloClient } from "@/plugins/apollo";
import { ApolloClients } from "@vue/apollo-composable";
import VueDOMPurifyHTML from "vue-dompurify-html";
import Vue3Toastify from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { pinia } from "@/store";

const app = createApp(App);

// set theme to light in the local storage
if (!localStorage.getItem("theme")) {
  localStorage.setItem("theme", "light");
}

app
  .use(router)
  .use(pinia)
  .provide(ApolloClients, {
    default: defaultApolloClient,
  })
  .use(vuetify)
  .use(Vue3Toastify, {
    autoClose: 2000,
    clearOnUrlChange: false,
  })
  .use(VueDOMPurifyHTML)
  .mount("#app");
