import Vue from "vue";
import VueRouter from "vue-router";
import Main from "../views/Main.vue";
import Login from "../views/Login/Login.vue";

import CategoryEdit from "./../views/Category/CategoryEdit.vue";
import CategoryList from "./../views/Category/CategoryList.vue";

import BannerEdit from "./../views/Banner/BannerEdit.vue";
import BannerList from "./../views/Banner/BannerList.vue";

import ArticleEdit from "./../views/Article/ArticleEdit.vue";
import ArticleList from "./../views/Article/ArticleList.vue";

import VideoEdit from "./../views/Video/VideoEdit.vue";
import VideoList from "./../views/Video/VideoList.vue";

import HeroEdit from "./../views/Hero/HeroEdit.vue";
import HeroList from "./../views/Hero/HeroList.vue";

import SkillEdit from "./../views/Skill/SkillEdit.vue";
import SkillList from "./../views/Skill/SkillList.vue";

import ItemEdit from "./../views/Item/ItemEdit.vue";
import ItemList from "./../views/Item/ItemList.vue";

import EpigraphEdit from "./../views/Epigraph/EpigraphEdit.vue";
import EpigraphList from "./../views/Epigraph/EpigraphList.vue";

import UserEdit from "./../views/User/UserEdit.vue";
import UserList from "./../views/User/UserList.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/login", name: "login", component: Login, meta: { isPublic: true } },
  {
    path: "/",
    name: "main",
    component: Main,
    children: [
      { path: "/categories/create", component: CategoryEdit },
      { path: "/categories/edit/:id", component: CategoryEdit, props: true },
      { path: "/categories/list", component: CategoryList },

      { path: "/banners/create", component: BannerEdit },
      { path: "/banners/edit/:id", component: BannerEdit, props: true },
      { path: "/banners/list", component: BannerList },

      { path: "/articles/create", component: ArticleEdit },
      { path: "/articles/edit/:id", component: ArticleEdit, props: true },
      { path: "/articles/list", component: ArticleList },

      { path: "/videos/create", component: VideoEdit },
      { path: "/videos/edit/:id", component: VideoEdit, props: true },
      { path: "/videos/list", component: VideoList },

      { path: "/heroes/create", component: HeroEdit },
      { path: "/heroes/edit/:id", component: HeroEdit, props: true },
      { path: "/heroes/list", component: HeroList },

      { path: "/skills/create", component: SkillEdit },
      { path: "/skills/edit/:id", component: SkillEdit, props: true },
      { path: "/skills/list", component: SkillList },

      { path: "/items/create", component: ItemEdit },
      { path: "/items/edit/:id", component: ItemEdit, props: true },
      { path: "/items/list", component: ItemList },

      { path: "/epigraphs/create", component: EpigraphEdit },
      { path: "/epigraphs/edit/:id", component: EpigraphEdit, props: true },
      { path: "/epigraphs/list", component: EpigraphList },

      { path: "/users/create", component: UserEdit },
      { path: "/users/edit/:id", component: UserEdit, props: true },
      { path: "/users/list", component: UserList },
    ],
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  if (!to.meta.isPublic && !localStorage.getItem("king-token")) {
    router.push("/login");
    return;
  }
  next();
});

export default router;
