import { createApp } from "vue";

import App from "./App.vue";
import router from "@/router";
import vuetify from "@/plugins/vuetify";
import "./scss/main.scss";
import { defaultApolloClient } from "@/plugins/apollo";
import { ApolloClients } from "@vue/apollo-composable";
import VueDOMPurifyHTML from "vue-dompurify-html";

const app = createApp(App);

app
  .use(router)
  .provide(ApolloClients, {
    default: defaultApolloClient,
  })
  .use(vuetify)
  .use(VueDOMPurifyHTML)
  .mount("#app");
