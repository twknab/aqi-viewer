import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import UserService from "../services/UserService";

const routesRequiringAuthentication = ["/dashboard"];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/RegisterView.vue"),
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("../views/DashboardView.vue"),
    },
    {
      path: "/:catchAll(.*)",
      name: "catchAll",
      component: HomeView,
    },
  ],
});

/*
  Ensure user cannot load logged in pages without having a valid session.
  https://router.vuejs.org/guide/advanced/navigation-guards.html#global-before-guards
  NOTE: This could be improved using vuex data store and simply checking
  if the user has already been authenticated (e.g, `if (isAuthd) { next() }`) 
*/
router.beforeEach((to, from, next) => {
  if (routesRequiringAuthentication.includes(to.path) === true) {
    UserService.getLoggedInUser()
      .then(() => {
        next();
      })
      .catch(() => {
        // Redirect non-logged in user to home
        next({ name: "home" });
      });
  } else if (
    // If user attempts to load homepage redirect to dashboard.
    to.name === "home" &&
    from.name === "dashboard" &&
    !("logout" in to.params) // Don't redirect on logout
  ) {
    UserService.getLoggedInUser()
      .then(() => {
        next({ name: "dashboard" });
      })
      .catch(() => {
        next();
      });
  } else {
    next();
  }
});

export default router;
