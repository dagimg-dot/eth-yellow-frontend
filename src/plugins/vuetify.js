// Vuetify
import './../main.scss'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    themes: {
      myCustomTheme: {
        colors: {
          primary: '#00BD73',
        },
      },
    },
  },
})

export default vuetify