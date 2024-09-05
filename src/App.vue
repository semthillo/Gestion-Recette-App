<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="page-background">
    <header>
      <nav class="navbar navbar-expand-lg custom-navbar fixed-top">
        <div class="container">
          <RouterLink class="navbar-brand text-decoration-none text-white fw-bold" to="/">GestionRecette</RouterLink>
          <button class="navbar-toggler text-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <i class="fas fa-bars"></i>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto">
              <li class="nav-item">
                <RouterLink class="nav-link text-white fw-bold" to="/listrecette">Recette</RouterLink>
              </li>
            </ul>
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
