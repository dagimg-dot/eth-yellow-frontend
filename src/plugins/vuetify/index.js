// Vuetify
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import defaults from "./defaults";

const vuetify = createVuetify({
  components,
  directives,
  defaults,
  theme: {
    themes: {
      light: {
        colors: {
          primary: "#DDDF00",
        },
      },
    },
  },
});

export default vuetify;
