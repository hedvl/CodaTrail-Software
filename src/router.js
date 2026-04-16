import { createRouter, createWebHistory } from "vue-router";
import LoginPresenter from "./presenter/loginPresenter.jsx";
import HomepagePresenter from "./presenter/homepagePresenter.jsx";

const routes = [
  { path: "/", redirect: "/login" },
  { path: "/login", component: LoginPresenter },
  { path: "/home", component: HomepagePresenter }
];

export const router = createRouter({
  history: createWebHistory(),
  routes
});