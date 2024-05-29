import { createApp } from "vue";

import App from "./App.vue";
import router from "./router/index.js";
import vuetify from "./plugins/vuetify";
import { default_apollo_client } from "./plugins/apollo";
import { ApolloClients } from "@vue/apollo-composable";
import modal from "@/plugins/modal";

import VueDOMPurifyHTML from "vue-dompurify-html";
import i18n from "@/plugins/i18n";

const app = createApp(App);

app.use(router)
.provide(ApolloClients, {
  default: default_apollo_client,
})
.use(vuetify)
.use(modal)
.use(VueDOMPurifyHTML)
.use(i18n)
.mount("#app");
