import Vue from "vue";
import VueRouter from "vue-router";
import Main from "@/views/Main.vue";
import Home from "@/views/Home/Home.vue";
import Strategy from "@/views/Strategy/Strategy.vue";
import Competition from "@/views/Competition/Competition.vue";

import Article from "./../views/Article/Article.vue";
import Video from "./../views/Video/Video.vue";
import Hero from "./../views/Hero/Hero.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
    children: [
      { path: "/", name: "home", component: Home },
      { path: "/strategy", name: "strategy", component: Strategy },
      { path: "/Competition", name: "competition", component: Competition },
      {
        path: "/articles/:id",
        name: "article",
        component: Article,
        props: true,
      },
      {
        path: "/videos/:id",
        name: "video",
        component: Video,
        props: true,
      },
    ],
  },
  {
    path: "/heroes/:id",
    name: "hero",
    component: Hero,
    props: true,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
