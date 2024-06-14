import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const token = ref(localStorage.getItem("session") || null);
  const user = ref(null);
  const isLoggedIn = computed(() => token.value !== null);

  function login(accessToken, user) {
    token.value = accessToken;
    localStorage.setItem("session", accessToken);
    user.value = user;
  }

  function logout() {
    localStorage.removeItem("session");
    token.value = null;
    user.value = null;
  }

  return { isLoggedIn, token, user, login, logout };
});
