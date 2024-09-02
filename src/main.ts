import { createApp } from "vue";
import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";

import App from "./App.vue";
import Home from "@/pages/Home.vue";
import Convert from "@/pages/Convert.vue";
import MainLayout from "@/shared/layouts/MainLayout.vue";

import "@/shared/assets/index.css";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: MainLayout,
    children: [
      { path: "", component: Home }, // Главная страница
      { path: "convert", component: Convert }, // Страница конвертации
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App).use(router).mount("#app");
