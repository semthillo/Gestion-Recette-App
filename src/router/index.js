import { createRouter, createWebHistory } from 'vue-router'
import RecetteView from '../views/RecetteView.vue'
import AjoutRecette from '@/components/Recettes/AjoutRecette.vue'
import ListRecette from '@/components/Recettes/ListRecette.vue'
import ModifiRecette from '@/components/Recettes/ModifiRecette.vue'
import HomePage from '@/components/HomePage.vue'

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    
    {
      path: '/',
      component: HomePage
    },
    {
      path: '/recette',
      component: RecetteView
    },
    {

      path: '/ajoutrecette',
      component: AjoutRecette
    },
    {
      path: '/listrecette',
      component: ListRecette
    },
    {
      path: '/modifierecette/:id',
      component: ModifiRecette,
      props: true
    }
    
  ]
})

export default router
