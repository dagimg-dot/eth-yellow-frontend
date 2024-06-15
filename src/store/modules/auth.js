import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const token = ref(localStorage.getItem("session") || null);
  const user = ref(JSON.parse(localStorage.getItem("user")) || null);
  const isLoggedIn = computed(() => token.value !== null);

  function login(accessToken, _user) {
    token.value = accessToken;
    user.value = _user;
    localStorage.setItem("session", accessToken);
    localStorage.setItem("user", JSON.stringify(_user));
  }

  function logout() {
    localStorage.removeItem("session");
    localStorage.removeItem("user");
    token.value = null;
    user.value = null;
  }

  return { isLoggedIn, token, user, login, logout };
});
