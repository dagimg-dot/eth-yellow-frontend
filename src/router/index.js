import { createWebHistory, createRouter } from "vue-router";
import { setupLayouts } from "virtual:generated-layouts";
import generatedRoutes from "virtual:generated-pages";
// import store from "@/store"

const routes = setupLayouts(generatedRoutes);

const history = createWebHistory();

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
  // store.loading(true)
  next();
});

router.afterEach(() => {
  // store.loading(false)
});

export default router;
