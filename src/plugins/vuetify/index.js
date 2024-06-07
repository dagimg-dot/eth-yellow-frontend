// Vuetify
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import defaults from "./defaults";
import theme from "./theme";
import { icons } from "./icons";

const vuetify = createVuetify({
  components,
  directives,
  defaults,
  theme,
  icons,
});

export default vuetify;
