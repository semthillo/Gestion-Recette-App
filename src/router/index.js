import { createRouter, createWebHistory } from "vue-router";
import RecetteView from "../views/RecetteView.vue";

// import AxiosRecetteView from "../components/TestAxios/ListRecette.vue";

import AjoutRecette from "@/components/Recettes/AjoutRecette.vue";
import ListRecette from "@/components/Recettes/ListRecette.vue";
import ModifiRecette from "@/components/Recettes/ModifiRecette.vue";
import HomePage from "@/components/HomePage.vue";
import AxiosCategoriesView from "@/components/Categories/ListCategories.vue";
import ListCategories from "@/components/Categories/ListCategories.vue";
import AjoutCategory from "@/components/Categories/AjoutCategory.vue";
import ModifiCategories from "@/components/Categories/ModifiCategories.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: HomePage,
    },
    {
      path: "/axios-categories",
      component: AxiosCategoriesView,
    },
    {
      path: "/list-category",
      component: ListCategories,
    },
    {
      path: "/ajout-category",
      component: AjoutCategory,
    },
    {
      path: "/recette",
      component: RecetteView,
    },
    {
      path: "/ajout-recette",
      component: AjoutRecette,
    },
    {
      path: "/listrecette",
      component: ListRecette,
    },
    {
      path: "/modifierecette/:id",
      component: ModifiRecette,
      props: true,
    },
    {
      path: "/modifie-category/:id",
      component: ModifiCategories,
      props: true,
    },
  ],
});

export default router;
