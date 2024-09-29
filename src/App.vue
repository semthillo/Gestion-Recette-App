<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useGestionStore } from './stores/gestion';
const store = useGestionStore();
import { useRoute } from "vue-router";

const route = useRoute();

import { getCurrentInstance } from 'vue';


const { proxy } = getCurrentInstance();

const changeLanguage = (locale) => {
  proxy.$i18n.locale = locale;
};
</script>

<template>
  <div class="page-background">
    <header>
      <nav class="navbar navbar-expand-lg custom-navbar ">
        <div class="container">
          <RouterLink class="navbar-brand text-decoration-none text-white fw-bold" to="/">{{ $t('Recipe management') }}</RouterLink>
          <button class="navbar-toggler text-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <i class="fas fa-bars"></i>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
          
            <ul class="navbar-nav ms-auto">
              <form class="d-flex ms-3" v-if="route.path === '/listrecette'">
              <input
                type="text"
                class="form-control me-2"
                v-model="store.searchQuery"
                placeholder="Rechercher recette..."
              />
            </form>
              <li class="nav-item">
                <RouterLink class="nav-link text-white fw-bold" to="/listrecette">{{ $t('navbar.recipes') }}</RouterLink>
              </li>
              <li class="nav-item">

                <RouterLink class="nav-link text-white fw-bold" to="/axios-categories">{{ $t('navbar.axiosRecipes') }}</RouterLink>
              </li>
            </ul>
            <select name="lang" id="lang" @change="changeLanguage($event.target.value)">
                <option value="en">En</option>
                <option value="fr">Fr</option>
              </select>
          </div>
        </div>
      </nav>
      <RouterView />
    </header>
  </div>
</template>

<style scoped>
.custom-navbar {
  background-color: #343a40; 
  border-radius: 0 0 10px 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 10px 0;
}

.navbar-brand {
  font-size: 1.5rem; 
}

.navbar-toggler {
  border: none;
}

.navbar-toggler .fas {
  font-size: 1.5rem;
}

.nav-link {
  margin-right: 15px;
}

.nav-link:hover {
  color: #f8f9fa; 
}

.navbar-nav {
  margin-left: auto;
}
</style>
