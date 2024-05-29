 import {  computed } from "vue";
import { useStorage } from "@vueuse/core";

const state = useStorage("session", {});

export default function ({} = {}) {
  // state.value = JSON.parse(localStorage.getItem("session") || "null") || {};
  return {
    isLoggedIn: computed(() => !!state.value.access_token),
   
    token: () => state.value.access_token,
   
    unset: () => {
      state.value = {};
      localStorage.removeItem("session");
    },

    set: (data) => {
      state.value = data;
    },
  };
}
