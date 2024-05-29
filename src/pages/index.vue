<script setup>
import { ref } from 'vue'
const messages = ref([
  {
    from: 'Lorem',
    message: `Lorem ipsum dolor sit amet consectetur adipiscing elit`,
    time: '10:42am',
    color: 'teal',
  },
  {
    from: 'Ipsum',
    message: `Lorem ipsum dolor sit amet consectetur adipiscing elit`,
    time: '10:37am',
    color: 'green',
  },
  {
    from: 'Dolor',
    message: `Lorem ipsum dolor sit amet consectetur adipiscing elit`,
    time: '9:47am',
    color: 'teal',
  },
])
</script>
<template>
  <v-sheet class="d-flex align-center justify-center h-screen">
    <v-sheet class="mb-10 pa-5 d-flex">
      <!-- <v-img
        src="/images/codelight.jpg">
      </v-img> -->
      <div class="text-h4 text-primary font-weight-light">
       Vite + Vue3 + Vuetify
       <br />
       <div class="mt-10">Codelight Starter</div>
      </div>
    </v-sheet>

    <v-sheet class="h-75 mt-16">
      <v-divider vertical thickness="2"></v-divider>
    </v-sheet>

    <v-sheet class="ma-5 pa-5">
      <v-card-text>
        <v-timeline density="compact" align="start">
          <v-timeline-item
            v-for="message in messages"
            :key="message.time"
            :dot-color="message.color"
            size="medium"
          >
            <div class="mb-4">
              <div class="font-weight-normal">
                <strong>{{ message.from }}</strong> @{{ message.time }}
              </div>
              <div>{{ message.message }}</div>
            </div>
          </v-timeline-item>
        </v-timeline>
      </v-card-text>
    </v-sheet>
  </v-sheet>
</template>
<route lang="yaml">
meta:
  layout: empty
</route>
