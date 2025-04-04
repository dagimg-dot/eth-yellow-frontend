import { createWebHistory, createRouter } from "vue-router";
import { setupLayouts } from "virtual:generated-layouts";
import generatedRoutes from "virtual:generated-pages";
import { toast } from "vue3-toastify";
import { useAuthStore } from "@/store/modules/auth";
import { storeToRefs } from "pinia";
import { validate as validateUUID } from "uuid";

const routes = setupLayouts(generatedRoutes);
const history = createWebHistory();

const AUTH_ROUTES = ["/auth/login", "/auth/signup"];
const GUARDED_STATIC_ROUTES = [
  "/listings/add",
  "/user/profile",
  "/user/listings",
];
const GUARDED_DYNAMIC_ROUTES_WITH_ID = ["/listings/edit/:id", "/listings/:id"];

const isGuarded = (toPath) => {
  if (GUARDED_STATIC_ROUTES.includes(toPath)) return true;
};

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

  if (!isLoggedIn.value) {
    if (
      isGuarded(to.path) ||
      GUARDED_DYNAMIC_ROUTES_WITH_ID[0] === to.matched[0].path
    ) {
      toast.error("You need to be logged in to access this page!");
      next("/auth/login");
      return;
    }
  } else {
    if (AUTH_ROUTES.includes(to.path)) {
      toast.info("You are already logged in!");
      next(from.path);
      return;
    }
  }

  if (GUARDED_DYNAMIC_ROUTES_WITH_ID.includes(to.matched[0].path)) {
    const id = to.params.id;
    const isValid = validateUUID(id);
    if (!isValid) {
      next("/notfound");
      return;
    }
  }

  next();
});

router.afterEach((to, from) => {
  if (to.path === "/notfound") {
    toast.error("Page not found!");
  }
});

export default router;
