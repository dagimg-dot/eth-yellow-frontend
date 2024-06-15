import { createWebHistory, createRouter } from "vue-router";
import { setupLayouts } from "virtual:generated-layouts";
import generatedRoutes from "virtual:generated-pages";
import { toast } from "vue3-toastify";
import { useAuthStore } from "@/store/modules/auth";
import { storeToRefs } from "pinia";

const routes = setupLayouts(generatedRoutes);
const history = createWebHistory();

const AUTH_ROUTES = ["/auth/login", "/auth/signup"];
const GUARDED_ROUTES = ["/listings/add", "/listings/edit"];

const router = createRouter({
  history,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const { isLoggedIn } = storeToRefs(authStore);

  if (!isLoggedIn.value && GUARDED_ROUTES.includes(to.path)) {
    toast.error("You need to be logged in to access this page!");
    next("/auth/login");
    return;
  }

  if (isLoggedIn.value && AUTH_ROUTES.includes(to.path)) {
    toast.info("You are already logged in!");
    next(from.path);
  } else {
    next();
  }
});

router.afterEach(() => {
  // store.loading(false)
});

export default router;
