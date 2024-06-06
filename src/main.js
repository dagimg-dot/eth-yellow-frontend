import { createApp } from "vue";

import App from "./App.vue";
import router from "@/router";
import vuetify from "@/plugins/vuetify";
import "./scss/main.scss";
import { defaultApolloClient } from "@/plugins/apollo";
import { ApolloClients } from "@vue/apollo-composable";
import modal from "@/plugins/modal";

import VueDOMPurifyHTML from "vue-dompurify-html";
import i18n from "@/plugins/i18n";

const app = createApp(App);

app
  .use(router)
  .provide(ApolloClients, {
    default: defaultApolloClient,
  })
  .use(vuetify)
  .use(modal)
  .use(VueDOMPurifyHTML)
  .use(i18n)
  .mount("#app");
